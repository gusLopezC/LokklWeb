import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService, ProspectosService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Password } from 'src/app/models/password.model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  imagenSubir: File;
  imagenTemp: string;
  token: string;
  PasswordRedSocial: boolean;



  // tslint:disable-next-line: variable-name
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _prospectosService: ProspectosService, ) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {

    this.validacontraseña();

    this.forma = new FormGroup({
      password: new FormControl(null, Validators.required),
      new_password: new FormControl(null, Validators.required),
      new_password2: new FormControl(null, Validators.required),
    }, { validators: this.sonIguales('new_password', 'new_password2') });
  }//end ngOnInit


  validacontraseña() {
    if (this.usuario.password == ':D') {
      this.PasswordRedSocial = false;
    }
    else {
      this.PasswordRedSocial = true;
    }
  }

  guardar(usuario: Usuario) {

    this.token = localStorage.getItem('token');
    this.usuario.name = usuario.name;
    if (!this.usuario.google) {
      this.usuario.email = usuario.email;
    }
    this.usuario.telephone = usuario.telephone;
    this._usuarioService.actualizarUsuario(this.usuario, this.token)
      .subscribe();

  }


  seleccionImage(archivo: File) {

    if (!archivo) {
      this.imagenSubir = null;
      return;
    }
    this.imagenSubir = archivo;

    if (archivo.type.indexOf('image') < 0) {
      swal.fire('Solo images', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    const reader = new FileReader();
    const urlImagenTemp = reader.readAsDataURL(archivo);
    reader.onloadend = () => this.imagenTemp = reader.result as string;
  }

  cambiarImagen() {
    this._usuarioService.cambiarImagen(this.imagenSubir).subscribe();
  }


  archivoVerificacion(archivo: File) {

    if (archivo.type.indexOf('image') < 0) {
      swal.fire('Solo images', 'El archivo seleccionado no es una imagen', 'error');
      this.imagenSubir = null;
      return;
    }

    this._usuarioService.archivoValidacion(archivo).subscribe(
      respo => {
        // tienearchivoVerficiacion = this._usuarioService.user;
        this.usuario = this._usuarioService.user;
      }
    );

  }
  eliminarCuenta() {

    this._usuarioService.borrarUsuario(this.usuario.id, this.token)
      .subscribe(respo => this._usuarioService.logout());
  }



  verificarCuentaResend() {
    this._usuarioService.resendVerification(this.usuario.id).subscribe();

  }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        sonIguales: true
      }

      return {
        sonIguales: true
      };

    };
  }

  cambiarPassword() {

    if (this.forma.value.new_password != this.forma.value.new_password2) {
      swal.fire('Error', 'La contraseña no coincide', 'error');
      return false;

    }

    const password = new Password(
      this.forma.value.password,
      this.forma.value.new_password
    );
    this._usuarioService.cambiarPassword(password)
      .subscribe(respo => this._usuarioService.logout()
      );
  }



}
