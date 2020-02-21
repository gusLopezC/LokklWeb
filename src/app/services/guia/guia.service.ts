import { Injectable } from '@angular/core';

import { Guia } from 'src/app/models/guia.model';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class GuiaService {
  token: string;

  constructor(public http: HttpClient, public router: Router) {
    this.token = localStorage.getItem('token');
   }


  cargarDatosPagoGuia(guia: Guia, token: string) {
    const url = URL_SERVICIOS + '/api/guias/datosPago';


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post(url, guia, { headers }).pipe(
      map((resp: any) => {
        swal.fire({
          icon: 'success',
          title: 'Tus datos han sido actualizados',
          showConfirmButton: false,
          timer: 4500
        }
        );
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

  }// endCargarDatosPago

  obtenerMisDatosdePago(id: string){
    const url = URL_SERVICIOS + '/api/guias/datosPago/' + id;


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

}
