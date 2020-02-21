import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';

import swal from 'sweetalert2';


import { Usuario } from 'src/app/models/usuario.model';
import { Tours } from 'src/app/models/tour.model';
import { ToursEdit } from '../../models/touredit.model';

import { UsuarioService } from '../usuarios/usuarios.service';

@Injectable({
  providedIn: 'root'
})
export class ToursService {

  token: string;
  usuario: Usuario;

  constructor(public http: HttpClient, public router: Router, public _usuarioService: UsuarioService, ) {
    this.token = localStorage.getItem('token');
    this.usuario = this._usuarioService.user;
  }


  guardarDatosTour(tour: Tours, fotos: File[], token: string) {


    const itinerary = JSON.stringify(tour.itinerary);
    const whatsIncluded = JSON.stringify(tour.whatsIncluded);


    const url = URL_SERVICIOS + '/api/tours';

    const formData = new FormData();

    formData.append('cuidad', tour.cuidad);
    formData.append('Pais', tour.pais);
    formData.append('placeID', tour.placeID);
    formData.append('name', tour.name);

    formData.append('mapaGoogle', tour.mapaGoogle);
    formData.append('puntoInicio', tour.puntoInicio);

    formData.append('schedulle', tour.schedulle);

    formData.append('itinerary', itinerary);
    formData.append('whatsIncluded', whatsIncluded);

    formData.append('categories', tour.categories);
    formData.append('duration', tour.duration);
    formData.append('idiomas', tour.lenguajes);
    formData.append('price', tour.price);
    formData.append('moneda', tour.moneda);
    formData.append('user_id', tour.user_id);

    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post(url, formData, { headers }).pipe(
      map((resp: any) => {
        this.subirImagenTour(fotos, resp.Tour.id).subscribe();
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

  subirImagenTour(fotos: File[], id: string) {
    this.token = localStorage.getItem('token');
    const url = URL_SERVICIOS + '/api/tours/uploadFiles/' + id;

    const formData = new FormData();

    for (let i = 0; i < fotos.length; i++) {
      formData.append('file[' + [i] + ']', fotos[i]);
    }
    let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'multipart/form-data');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, formData, { headers }).pipe(
      map((resp: any) => {
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


  buscarPorCiudad(placeID: string) {

    const url = URL_SERVICIOS + '/api/tours/ObtenerPorCiudad/' + placeID;

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

  obtenerTour(slug: string) {
    const url = URL_SERVICIOS + '/api/tours/ObtenerTour/' + slug;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        resp.Tour.itinerary = JSON.parse(resp.Tour.itinerary);
        resp.Tour.whatsIncluded = JSON.parse(resp.Tour.whatsIncluded);
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

  obtenerMisTour(id: string, token: string) {
    const url = URL_SERVICIOS + '/api/tours/misTours/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get(url, { headers }).pipe(
      map((resp: any) => {
        if (resp.Tours.length >= 1) {
          return resp;
        }
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

  borrarTour(id: string) {
    const url = URL_SERVICIOS + '/api/tours/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.delete(url, { headers }).pipe(
      map((resp: any) => {
        // return resp.Tour;
        swal.fire(
          'Deleted!',
          'Su tour ha sido eliminado.',
          'success'
        );
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

  EditarTour(tour: ToursEdit, fotos: File[], token: string) {


    const url = URL_SERVICIOS + '/api/tours/editTours';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.post(url, tour, { headers }).pipe(
      map((resp: any) => {

        if (fotos.length >= 1) {
          this.subirImagenTour(fotos, resp.Tour.id).subscribe();
        }

        swal.fire(
          'Exito!',
          'Su tour ha sido actualizado.',
          'success'
        );
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

  }//end editartour

  EliminarFoto(id: string, token: string) {

    const url = URL_SERVICIOS + '/api/tours/borrarFotoTour/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.delete(url, { headers }).pipe(
      map((resp: any) => {
        swal.fire(
          'Exito!',
          'Su foto ha sido actualizado.',
          'success'
        );
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
