import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { Payment } from '../../models/payment.model';

@Injectable({
  providedIn: 'root'
})

export class ReservasService {

  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.token = localStorage.getItem('token');
  }

  obtenerMisViajes(id: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerMisViajes/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);


    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));

  }

  obtenerHistorialMisViajes(id: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerHistorialMisViajes/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));
  }

  obtenerReservas(id: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerReservaciones/' + id;


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);


    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));

  }

  obtenerHistorialReservas(id: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerHistorialReservaciones/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));
  }

  actualizarEstadoReserva(id: string, estado: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/aceptarTour';

    const DatosActualizacion = {
      id: id,
      estado: estado
    };

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);


    return this.http.post(url, DatosActualizacion, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));
  }

  obtenerReservacionparaCancelarGuia(pedido: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerDiferenciasDias/' + pedido;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);


    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));


  }
  cancelarReservacionCliente(pedido: string, motivo: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/cancelarReservacionCliente';

    const DatosCancelacion = {
      pedido,
      motivo
    };


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, DatosCancelacion, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));
  }

  cancelarReservacionGuia(pedido: string, motivo: string, token: string) {
    const url = URL_SERVICIOS + '/api/reservaciones/cancelarReservacionGuia';

    const DatosCancelacion = {
      pedido,
      motivo
    };


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, DatosCancelacion, { headers }).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.error.message,
        });
        return throwError(error);
      }));
  }
}
