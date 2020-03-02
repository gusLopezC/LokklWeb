import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { environment } from './../../../environments/environment.prod';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ChatService {

  token: any;

  constructor(public http: HttpClient) {
    this.obtenertoken();
  }

  async obtenertoken() {
    return this.token = this.token = localStorage.getItem('token');

  }


  obtenerMensajesTurista(id: any, token: string): Observable<any> {

    const url = environment.apiUrl + 'api/mensajes/obtenerChatsTurista/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + token);

    return this.http.get(url, { headers });
  }

  obtenerChatReservacion(id: any): Observable<any> {


    const url = environment.apiUrl + 'api/mensajes/obtenerChatReservacion/' + id;

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.get(url, { headers });
  }


  sendMessage(reserva, mensaje: string): Observable<any> {

    const cuerpoDatos = {
      id_reservacion: reserva.id_reservacion,
      id_comprador: reserva.id_comprador,
      id_guia: reserva.id_guia,
      mensaje
    };

    const url = environment.apiUrl + 'api/mensajes/sendMessage';

    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json');
    headers = headers.set('Authorization', 'Bearer ' + this.token);

    return this.http.post(url, cuerpoDatos, { headers });
  }

}
