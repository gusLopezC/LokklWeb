import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import swal from 'sweetalert2';
import { RecoveryPasswordService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  
  forma: FormGroup;
  token: string;
  constructor(
    // tslint:disable-next-line: variable-name
    private rutaActiva: ActivatedRoute,
    public _recoveryPasswordService: RecoveryPasswordService,
    public router: Router) { }


  ngOnInit() {

    this.token = this.rutaActiva.snapshot.params.token,
    this.forma = new FormGroup({
      
      password: new FormControl(null, Validators.required),
      password2: new FormControl(null, Validators.required),
      condiciones: new FormControl(false),
      role: new FormControl(false),
      recaptchaReactive: new FormControl(null, Validators.required)
    }, { validators: this.sonIguales('password', 'password2') });
  }


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

  CambiarPassword(){

    if (this.forma.value.password.length < 6) {
      swal.fire('Important', 'La contraseña debe tener más de 6 caracteres.', 'warning');
      return false;
    }

    this._recoveryPasswordService.resetPassword(this.token,this.forma.value.password)
    .subscribe(respo => {
      this.router.navigate(['/home'])
    });

  }

}
