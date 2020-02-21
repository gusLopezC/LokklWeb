import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { NgForm } from '@angular/forms';
import swal from 'sweetalert2';
import {  RecoveryPasswordService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';


@Component({
  selector: 'app-recovery-passoerd',
  templateUrl: './recovery-passoerd.component.html',
  styleUrls: ['./recovery-passoerd.component.css']
})
export class RecoveryPassoerdComponent implements OnInit {

  forma: NgForm;

  constructor(public _RecoveryPasswordService: RecoveryPasswordService, public router: Router) { }

  ngOnInit() {
  }

  enviarCorreoRecuperacion(forma: NgForm) {

    this._RecoveryPasswordService.recoveryPassword(forma.value.email)
      .subscribe(respo => {
        this.router.navigate(['/home'])
      });

  }

}
