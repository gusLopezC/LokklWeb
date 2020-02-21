import { Injectable } from '@angular/core';
import { Usuario } from 'src/app/models/usuario.model';
import { Password } from 'src/app/models/password.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { URL_SERVICIOS } from '../../config/config';
import { map, catchError } from 'rxjs/operators';
import { throwError } from 'rxjs/internal/observable/throwError';
import { Router } from '@angular/router';
import { AuthService } from 'angularx-social-login';

// import 'rxjs/add/operator/catch';
import swal from 'sweetalert2';
import { DatosPersonales } from '../../models/datosPersonales.model';




@Injectable({
    providedIn: 'root'
})
export class UsuarioService {



    token: string;
    user: Usuario;
    public usserLogged: Usuario;

    constructor(public http: HttpClient, public router: Router, private authService: AuthService) {
        this.cargarStorage();
    }

    guardarStorage(token: string, user: Usuario) {
        localStorage.setItem('token', token);
        localStorage.setItem('user', JSON.stringify(user));

        this.user = user;
        this.token = token;

    }

    cargarStorage() {

        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.user = JSON.parse(localStorage.getItem('user'));

        } else {
            this.token = '';
            this.user = null;
        }
    }

    loginGoogle(usuario: Usuario) {

        const url = URL_SERVICIOS + '/api/LoginGoogle';
        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                this.usserLogged = resp.user;
                this.guardarStorage(resp.token, resp.user);
                return true;
            }));
    }

    login(usuario: Usuario, recordar: boolean = false) {
        if (recordar) {
            localStorage.setItem('email', usuario.email);
        } else {
            localStorage.removeItem('email');
        }
        const url = URL_SERVICIOS + '/api/login';
        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                this.usserLogged = resp.user;
                this.guardarStorage(resp.token, resp.user);
                return true;
            }),
            catchError(error => {
                swal.fire('Usuario o contraseña incorrectos', error, 'error');
                return throwError(error);
            }));

    }

    crearUsuario(usuario: Usuario) {

        const url = URL_SERVICIOS + '/api/register';
        return this.http.post(url, usuario).pipe(
            map((resp: any) => {
                this.login(usuario);
                // return resp.usuario;
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


    logout() {
        this.token = '';
        this.user = null;

        localStorage.removeItem('token');
        localStorage.removeItem('user');
        localStorage.clear();
        this.authService.signOut();
        this.router.navigate(['/home']);
    }

    estaLogueado() {
        if (localStorage.getItem('token')) {
            this.token = localStorage.getItem('token');
            this.user = JSON.parse(localStorage.getItem('user'));
            const url = URL_SERVICIOS + '/api/users/refreshProfile';

            let headers = new HttpHeaders();
            headers = headers.set('Content-Type', 'application/json');
            headers = headers.set('Accept', 'application/json'),
                headers = headers.set('Authorization', 'Bearer ' + this.token);

            const datosusuario = JSON.stringify(this.user);

            return this.http.post(url, datosusuario, { headers }).pipe(
                map((resp: any) => {
                    this.token = '';
                    this.user = null;
                    localStorage.removeItem('token');
                    localStorage.removeItem('user');
                    this.guardarStorage(resp.token, resp.user);
                    return true;
                }));
        }
    }


    actualizarUsuario(usuario: Usuario, token: string) {

        const url = URL_SERVICIOS + '/api/users/' + usuario.id;

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + token);


        const datosusuario = JSON.stringify(usuario);

        return this.http.put(url, usuario, { headers }).pipe(
            map((resp: any) => {

                this.guardarStorage(this.token, usuario);

                swal.fire('Usuario actualizado', usuario.name, 'success');
                return true;
            }));
    }


    obtenerInformacionContacto(id: string) {
        const url = URL_SERVICIOS + '/api/users/contactoEmergencia/' + id;

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + this.token);


        return this.http.get(url, { headers }).pipe(
            map((resp: any) => {
                return resp;
            }),
        );

    }


    guardarContactoemergencia(datos: DatosPersonales) {
        const url = URL_SERVICIOS + '/api/users/guardarcontactoEmergencia';


        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, datos, { headers }).pipe(
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

    archivoValidacion(archivo: File) {

        const url = URL_SERVICIOS + '/api/users/archivovalidacion';
        const formData = new FormData();
        formData.append('photo', archivo);


        let headers = new HttpHeaders();
        // headers = headers.set('Content-Type', 'multipart/form-data');
        // headers = headers.set('Accept', 'application/json');
        headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, formData, { headers }).pipe(
            map((resp: any) => {
                swal.fire('Actualización de foto', '', 'success');
                this.guardarStorage(resp.token, resp.user);
                return resp;
            }));
    }


    cambiarImagen(archivo: File) {
        const url = URL_SERVICIOS + '/api/users/perfil/foto';
        const formData = new FormData();
        formData.append('photo', archivo);

        let headers = new HttpHeaders();

        headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, formData, { headers }).pipe(
            map((resp: any) => {
                swal.fire('Actualización de foto', '', 'success');
                this.guardarStorage(resp.token, resp.user);
                return true;
            }));

    }
    borrarUsuario(id: string, token: string) {

        const url = URL_SERVICIOS + '/api/users/' + id;

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + token);

        return this.http.delete(url, { headers }).pipe(
            map((resp: any) => {
                swal.fire('User', 'El usuario ha eliminado', 'success');
                return true;
            }));

    }

    resendVerification(id: string, ) {
        this.token = localStorage.getItem('token');
        const url = URL_SERVICIOS + '/api/users/' + id + '/resend';

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/x-www-form-urlencoded');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.get(url, { headers }).pipe(
            map((resp: any) => {
                swal.fire('Mail Send', 'Recibe tu buzón por favor', 'success');
                return true;
            }));
    }

    obtenerPerfilPublico(id: string) {
        const url = URL_SERVICIOS + '/api/users/perfil/perfilpublico/' + id;

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.get(url, { headers }).pipe(
            map((resp: any) => {
                return resp;
            }),
            catchError(error => {
                swal.fire({
                    icon: 'error',
                    title: 'Oops...',
                    text: error.error.message,
                });
                return throwError(error);
            }));

    }

    cambiarPassword(password: Password) {


        this.token = localStorage.getItem('token');
        const url = URL_SERVICIOS + '/api/users/perfil/changepassword';

        let headers = new HttpHeaders();
        headers = headers.set('Content-Type', 'application/json');
        headers = headers.set('Accept', 'application/json'),
            headers = headers.set('Authorization', 'Bearer ' + this.token);

        return this.http.post(url, password, { headers }).pipe(
            map((resp: any) => {
                swal.fire('Actualización de contraseña', 'Por favor inicie sesión nuevamente', 'success');
                return true;
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
