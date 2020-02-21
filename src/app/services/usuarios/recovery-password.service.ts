import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';



@Injectable({
  providedIn: 'root'
})
export class RecoveryPasswordService {

  constructor(public http: HttpClient, public router: Router, ) { }

  recoveryPassword(email: string) {

    const Data = {
      email
    };

    const url = URL_SERVICIOS + '/api/password/create';

    return this.http.post(url, Data).pipe(
      map((resp: any) => {
        swal.fire(
          'Correcto!',
          'Se a enviado un email de recuperacíon a tu correo',
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

  resetPassword(token:string, password : string){

    const url = URL_SERVICIOS + '/api/password/reset';

    const Data = {
      token,
      password
    };

    return this.http.post(url, Data).pipe(
      map((resp: any) => {
        swal.fire(
          'Correcto!',
          'Se a restablecido tu contraseña ',
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
