import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';

import swal from 'sweetalert2';

import { Usuario } from 'src/app/models/usuario.model';
import { Tours } from 'src/app/models/tour.model';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ToursCiudadService {

  token: string;
  usuario: Usuario;
  lenguaje: string;

  constructor(@Inject(PLATFORM_ID) private platformId: Object, public http: HttpClient, public router: Router, ) {
    if (isPlatformBrowser(this.platformId)) {
      this.token = localStorage.getItem('token');
    }
  }

  obtenerTourScrollInfinite(numeropagina: number) {

    if (isPlatformBrowser(this.platformId)) {
      this.lenguaje = localStorage.getItem('lenguaje');
    }

    const url = URL_SERVICIOS + '/api/tours/' + this.lenguaje + '/ObtenerTourInfiniteScroll?page=' + numeropagina;

    return this.http.get(url).pipe(
      map((resp: any) => {
        return resp;
      })
    );
  }

  obtenerToursNuevos() {
    const url = URL_SERVICIOS + '/api/tours/ObtenerToursNuevos';
    return this.http.get(url).pipe(
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

  obtenerToursCiudad(ciudad: string) {
    const url = URL_SERVICIOS + '/api/tours/ObtenerToursCiudad/' + ciudad;
    return this.http.get(url).pipe(
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
