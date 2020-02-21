import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

import { Comentario } from 'src/app/models/comentario.model';


@Injectable({
  providedIn: 'root'
})
export class ComentariosService {

  constructor(public http: HttpClient, public router: Router) { }
  token: string;

  crearComentario(comentario: Comentario){
    const url = URL_SERVICIOS + '/api/tour/comentarios';


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' );

    return this.http.post(url, comentario, { headers }).pipe(
      map((resp: any) => {
        swal.fire({
          icon: 'success',
          title: 'Tu comentario a sido guardado',
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

 
}
