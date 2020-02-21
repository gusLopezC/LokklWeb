import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import swal from 'sweetalert2';
import { throwError } from 'rxjs/internal/observable/throwError';


@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(public http: HttpClient) { }

  enviarMailContacto(name: string, email: string, textomensaje: string) {


    var CuerpoCorreo = {
      name,
      email,
      textomensaje,
    };

    const url = URL_SERVICIOS + '/api/emailContacto';

    return this.http.post(url, CuerpoCorreo).pipe(
      map((resp: any) => {
        swal.fire('Tu correo ha sido enviado', '', 'success');
        return true;
      })
      ,
      catchError(error => {
        swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Ha ocurrido un error, intente nuevamente más tarde',
        });
        return throwError(error);
      }));

  }
}
