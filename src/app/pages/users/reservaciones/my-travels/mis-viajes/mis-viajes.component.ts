import { Component, OnInit } from '@angular/core';
import { ToursService, UsuarioService, ReservasService } from 'src/app/services/service.index';

import { Usuario } from 'src/app/models/usuario.model';
import { Payment } from 'src/app/models/payment.model';
import Swal from 'sweetalert2';
import { Router, NavigationExtras } from '@angular/router';


@Component({
  selector: 'app-mis-viajes',
  templateUrl: './mis-viajes.component.html',
  styleUrls: ['./mis-viajes.component.css']
})
export class MisViajesComponent implements OnInit {

  usuario: Usuario;
  reservas: Payment;
  token: string;
  cargando = true;
  HayTours = false;
  NoHayTours = true;
  myDate: string;

  constructor(public router: Router,
    public _usuarioService: UsuarioService,
    public _toursService: ToursService,
    public _reservasService: ReservasService) {
    this.usuario = this._usuarioService.user
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.obtenerReservaciones();
  }

  obtenerReservaciones() {
    this._reservasService.obtenerMisViajes(this.usuario.id, this.token)
      .subscribe((resp: any) => {
        if (resp.Reservaciones.length >= 1) {
          this.reservas = resp.Reservaciones;
          console.log(this.reservas)
          this.HayTours = true
          this.NoHayTours = false;
        }
        this.cargando = false;
      });
  }

  mostrarHistorial() {
    this.cargando = true;
    this._reservasService.obtenerHistorialMisViajes(this.usuario.id, this.token)
      .subscribe((resp: any) => {

        if (resp.Reservaciones.length >= 1) {
          this.reservas = resp.Reservaciones;
          this.HayTours = true
          this.NoHayTours = false;
        }
        this.cargando = false;
      });
  }

  cancelarReservacion(orden: string) {

    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, cancelar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/users/cancelmyTravel', orden])
      }
    })
  }

  enterChat(reserva, nameGuia) {
    let navigationExtras: NavigationExtras = {
      state: {
        origen: 'Turista',
        reserva: reserva,
        nameGuia: nameGuia
      }
    };
    this.router.navigate(['/users/chat'], navigationExtras);

  }
}
