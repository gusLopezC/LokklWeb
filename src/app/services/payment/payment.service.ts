import { Injectable } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Payment } from 'src/app/models/payment.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Injectable({
  providedIn: 'root'
})
export class PaymentService {
  token: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public http: HttpClient,
    public router: Router) {
    if (isPlatformBrowser(this.platformId)) {

      this.token = localStorage.getItem('token');
    }
  }

  crearPagoStripe(pago: Payment) {
    const url = URL_SERVICIOS + '/api/transactions/paymentStripe';


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);


    return this.http.post(url, pago, { headers }).pipe(
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

  crearPagoPaypal(pago: Payment) {
    const url = URL_SERVICIOS + '/api/transactions/paymentPaypal';


    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, pago, { headers }).pipe(
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
