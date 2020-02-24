import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { UsuarioService, ProspectosService } from 'src/app/services/service.index';
import { Usuario } from '../../../../models/usuario.model';
import { DatosPersonales } from '../../../../models/datosPersonales.model';

import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-contacto-emergencia',
  templateUrl: './contacto-emergencia.component.html',
  styleUrls: ['./contacto-emergencia.component.css']
})
export class ContactoEmergenciaComponent implements OnInit {

  usuario: Usuario;
  token: string;
  datospersonales: DatosPersonales = new DatosPersonales('', '', '', '');
  cargando = false;
  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
  ) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');
    this.obtenerInformacion();
  }

  ngOnInit() {

  }


  obtenerInformacion() {
    this._usuarioService.obtenerInformacionContacto(this.usuario.id).subscribe(
      resp => {
        if (resp.guia.length < 1) {
          console.log('');
        } else {
          this.datospersonales = resp.guia[0];

        }
        this.cargando = true;
      }
    );
  }


  formularioContactoEmergencia(datospersonales: DatosPersonales) {

    const datos = new DatosPersonales(

      datospersonales.NameContactoEmergencia,
      datospersonales.NumContactoEmergencia,
      datospersonales.EmailContactoEmergencia,
      this.usuario.id,
    );


    this._usuarioService.guardarContactoemergencia(datos)
      .subscribe((resp: any) => {
        swal.fire({
          icon: 'success',
          title: 'Se ha guardado con exito',
          showConfirmButton: false,
          timer: 4500
        });
        // this.router.navigate(['/users/account-welcome'])
      });
  }

}
