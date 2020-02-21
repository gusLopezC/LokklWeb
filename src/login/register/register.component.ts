import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  forma: FormGroup;
  role: string;
  constructor(
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    public router: Router) { }

  sonIguales(campo1: string, campo2: string) {

    return (group: FormGroup) => {

      const pass1 = group.controls[campo1].value;
      const pass2 = group.controls[campo2].value;

      if (pass1 === pass2) {
        return null;
      }

      return {
        sonIguales: true
      };

    };

  }

  ngOnInit() {
    this.forma = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
      role: new FormControl(false),
      recaptchaReactive: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });

  }

  registrarUsuario() {
    if (!this.forma.value.condiciones) {
      swal.fire('Important', 'Debes aceptar las condiciones', 'warning');
      return;
    }
    if (this.forma.value.password.length < 6) {
      swal.fire('Important', 'La contraseña debe tener más de 6 caracteres.', 'warning');
      return false;
    }

    const usuario = new Usuario(
      this.forma.value.name,
      this.forma.value.email,
      this.forma.value.password,
      this.forma.value.image,
      this.forma.value.telefono,
      this.forma.value.infopersonal,
      this.role = 'USER_ROLE',
      this.forma.value.google,
    );

    this._usuarioService.crearUsuario(usuario)
      .subscribe(respo => this._usuarioService.login(usuario)
        .subscribe(resp => this.router.navigate(['/home'])));
  }


}
