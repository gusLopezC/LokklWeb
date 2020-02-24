import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { Guia } from '../../../../models/guia.model';
import { GuiaService, UsuarioService } from 'src/app/services/service.index';
import { myOptionsPaises } from 'src/app/config/paises';
import swal from 'sweetalert2';


@Component({
  selector: 'app-datos-guide-payments',
  templateUrl: './datos-guide-payments.component.html',
  styleUrls: ['./datos-guide-payments.component.css']
})
export class DatosGuidePaymentsComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  token: string;
  cargando: boolean = true;
  guia: Guia = new Guia('', '', '', '', '', '', '');

  paises: any;

  constructor(
    public router: Router,
    public _GuiaService: GuiaService,
    public _usuarioService: UsuarioService) {

    this.usuario = this._usuarioService.user;
    this.paises = myOptionsPaises;
    this.token = this._usuarioService.token;
    this.obtenerMisDatosdePago()

  }

  ngOnInit() {
  }

  obtenerMisDatosdePago() {
   // this.cargando = true;
    this._GuiaService.obtenerMisDatosdePago(this.usuario.id)
      .subscribe(resp => {
        if(resp.guia){
          this.guia = resp.guia;
        }
        this.cargando = false;
      });
  }

  mandarDatosPago(forma: NgForm) {


    if (forma.value.pais === null || forma.value.pais === '') {
      swal.fire('Por favor selecciona tu pais', '', 'warning');

      return false;
    }
    const guia = new Guia(
      this.usuario.id,
      forma.value.pais,
      forma.value.tipomoneda,
      forma.value.clabeInterbancaria,
      forma.value.numeroCuenta,
      forma.value.RFC,
      forma.value.CURP,

    );
    this._GuiaService.cargarDatosPagoGuia(guia, this.token)
      .subscribe(correcto => this.router.navigate(['/users/account-welcome']));

  }
}
