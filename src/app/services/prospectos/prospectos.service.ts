import { Injectable } from '@angular/core';
import { Prospectos } from 'src/app/models/prospectos.model';
import { ProspectosEmpresa } from '../../models/prospectosEmpresa.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import swal from 'sweetalert2';
import { UsuarioService } from '../usuarios/usuarios.service';
import { Usuario } from 'src/app/models/usuario.model';


@Injectable({
    providedIn: 'root'
})
export class ProspectosService {

    token: string;
    usuario: Usuario;

    constructor(public http: HttpClient, public router: Router, public _usuarioService: UsuarioService) {
        this.token = localStorage.getItem('token');
        this.usuario = this._usuarioService.user;
    }

    crearProspecto(prospecto: Prospectos, token: string) {

        const url = URL_SERVICIOS + '/api/prospectos';
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + token);

        return this.http.post(url, prospecto, { headers }).pipe(
            map((resp: any) => {
                swal.fire({
                    icon: 'success',
                    title: 'Su registro ha sido creado',
                    showConfirmButton: false,
                    timer: 1500
                }
                );
                // return resp.prospecto;
            })
            ,
            catchError(error => {
                if (error) {
                }
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.errors,
                });
                return throwError(error);
            }));
    }// end crearProspecto


    crearProspectoEmpresa(prospecto: ProspectosEmpresa, token: string) {

        const url = URL_SERVICIOS + '/api/prospectosEmpresa';
        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + token);

        return this.http.post(url, prospecto, { headers }).pipe(
            map((resp: any) => {
                swal.fire({
                    icon: 'success',
                    title: 'Tu registro a sido creado',
                    showConfirmButton: false,
                    timer: 1500
                }
                );
            })
            ,
            catchError(error => {
                if (error) {
                }
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.errors,
                });
                return throwError(error);
            }));
    }

    subirArchivos(archivo: File, campo: string) {


        const url = URL_SERVICIOS + '/api/users/perfil/documentGuide';

        const formData = new FormData();
        formData.append('photo', archivo);
        formData.append('campo', campo);
        formData.append('iduser', this.usuario.id);

        let headers = new HttpHeaders();
        // headers = headers.set('Content-Type', 'multipart/form-data');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + this.token);


        return this.http.post(url, formData, { headers }).pipe(
            map((resp: any) => {
                swal.fire('Documento Guargado', '', 'success');
                return true;
            }));

    }

    validaProspectoValidado(id: string, token: string) {
        const url = URL_SERVICIOS + '/api/users/prospectos/prospectoRegistrado/' + id;

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + token);

        return this.http.get(url, { headers }).pipe(
            map((resp: any) => {

                return resp.Prospecto;

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

    // end validaProspectoRegistrado





}
