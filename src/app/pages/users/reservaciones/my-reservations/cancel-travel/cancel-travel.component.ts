import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToursService, UsuarioService, ReservasService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Payment } from 'src/app/models/payment.model';
import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';

@Component({
  selector: 'app-cancel-travel',
  templateUrl: './cancel-travel.component.html',
  styleUrls: ['./cancel-travel.component.css']
})
export class CancelTravelComponent implements OnInit {

  usuario: Usuario;
  reserva: Payment;
  pedido: string;
  cargando: boolean;
  token: string;
  puedeCancelar: boolean;
  mostrarListaOpciones: boolean;

  constructor(private rutaActiva: ActivatedRoute,
    public _toursService: ToursService,
    public _usuarioService: UsuarioService,
    public _reservasService: ReservasService,
    public router: Router) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {

    this.pedido = this.rutaActiva.snapshot.params.pedido,
      this.cargando = true;
    this.obtenerReservacion(this.pedido);
  }


  obtenerReservacion(pedido: string) {
    this.cargando = true;
    this._reservasService.obtenerReservacionparaCancelarGuia(pedido, this.token)
      .subscribe((resp: any) => {
        if (resp.HorasparaTour >= 48) {
          this.puedeCancelar = true;
          this.reserva = resp.Reservaciones;
        } else {
          this.puedeCancelar = false;
        }
        this.cargando = false;
      });

  }

  CancelarPedidoCliente(forma: NgForm) {

    if (forma.value.MotivoCancelacion == '' || forma.value.MotivoCancelacion == null) {
      swal.fire('Buscamos mejorar nuestro servicio', 'Indicanos el motivo de la cancelacion', 'warning');
      return false;
      }

    if (forma.value.MotivoCancelacion == 'Otro' && forma.value.MotivoCancelacionTextArea == '') {
      swal.fire('Completa el formulario', 'Indicanos el motivo de la cancelacion completando el campo', 'warning');
      return false;

    }

    if (forma.value.MotivoCancelacion == 'Otro') {
      forma.value.MotivoCancelacion = forma.value.MotivoCancelacionTextArea;
    }

    this._reservasService.cancelarReservacionCliente(this.pedido, forma.value.MotivoCancelacion, this.token)
      .subscribe((resp: any) => {
        swal.fire('Cancelación exitosa', 'Revisa tu correo para ver todos los detalles', 'success');

        this.router.navigate(['/users/myTraverls']);
      });

  }


  mostrarOpciones(value: boolean) {
    if (value) {
      this.mostrarListaOpciones = true
    } else {
      this.mostrarListaOpciones = false
    }

  }


}
