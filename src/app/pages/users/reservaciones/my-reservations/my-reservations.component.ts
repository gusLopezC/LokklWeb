import { Component, OnInit } from '@angular/core';
import { ToursService, UsuarioService, ReservasService } from 'src/app/services/service.index';


import { Usuario } from 'src/app/models/usuario.model';
import { Payment } from 'src/app/models/payment.model';
import Swal from 'sweetalert2';
import { Router, NavigationExtras } from '@angular/router';


Payment
@Component({
  selector: 'app-my-reservations',
  templateUrl: './my-reservations.component.html',
  styleUrls: ['./my-reservations.component.css']
})
export class MyReservationsComponent implements OnInit {
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
    this.cargando = true;
    this._reservasService.obtenerReservas(this.usuario.id, this.token)
      .subscribe((resp: any) => {

        if (resp.Reservaciones.length >= 1) {
          this.reservas = resp.Reservaciones;
          this.HayTours = true
          this.NoHayTours = false;
        }
        this.cargando = false;
      });
  }

  mostrarHistorial() {
    this.cargando = true;
    this._reservasService.obtenerHistorialReservas(this.usuario.id, this.token)
      .subscribe((resp: any) => {

        if (resp.Reservaciones.length >= 1) {
          this.reservas = resp.Reservaciones;
          this.HayTours = true
          this.NoHayTours = false;
        }
        this.cargando = false;
      });
  }

  cambiarestadoReservacion(id: string, estado: string) {

    this._reservasService.actualizarEstadoReserva(id, estado, this.token)
      .subscribe((resp: any) => {
        this.reservas = resp.Reservaciones;
      });
  }

  rechazarReservacion(orden: string) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, rechazar'
    }).then((result) => {
      if (result.value) {
        this.router.navigate(['/users/cancelresertation', orden])
      }
    })

  }

  enterChat(reserva, nameGuia) {
    let navigationExtras: NavigationExtras = {
      state: {
        origen: 'Guia',
        reserva: reserva,
        nameGuia: nameGuia
      }
    };
    this.router.navigate(['/users/chat'], navigationExtras);

  }

}
