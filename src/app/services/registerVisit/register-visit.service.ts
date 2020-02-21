import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
@Injectable({
  providedIn: 'root'
})
export class RegisterVisitService {

  constructor(public http: HttpClient) { }

  guardarVisitaTour(id_tour: string, user_id: string) {
   
    var cuerpoDatos = {
      id_tour: id_tour,
      user_id
    };

    const url = URL_SERVICIOS + '/api/visitas/guardarVisita';

    return this.http.post(url, cuerpoDatos).pipe(
      map((resp: any) => {
        return resp;
        // return resp.prospecto;
      })
      ,
      catchError(error => {
        return throwError(error);
      }));
  }
}// end class
