import { Component, OnInit } from '@angular/core';
import swal from 'sweetalert2';

import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { Usuario } from 'src/app/models/usuario.model';
import { Prospectos } from 'src/app/models/prospectos.model';
import { ProspectosService, UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-validate-identity',
  templateUrl: './validate-identity.component.html',
  styleUrls: ['./validate-identity.component.css']
})
export class ValidateIdentityComponent implements OnInit {
  usuario: Usuario;
  token: string;
  files: File[] = [];

  cantidadarchivos: Array<string> = [];

  constructor(public _prospectoService: ProspectosService,
    public _usuarioService: UsuarioService,
    public router: Router) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {

    this.comprobarProspectoValidaIdentidad(this.usuario.id);

  }
 
  comprobarProspectoValidaIdentidad(id: string) {

    this._prospectoService.validaProspectoValidado(id, this.token)
      .subscribe(resp => {
        if (!resp) {
          this.NoComplateRegistro();
        }

        // tslint:disable-next-line: max-line-length
        if (!(resp.document_identificacion === 'Pendiente') && !(resp.document_comprobantedomicilio === 'Pendiente') 
        && !(resp.document_cedulafiscal === 'Pendiente' && !(resp.document_certificacion === 'Pendiente'))) {
          this.DocumentosCargos();
        }

      });
  }


  NoComplateRegistro() {
    swal.fire({
      icon: 'info',
      title: 'Lo siento',
      text: 'Primero debes llenar tu registro',
    });
    this.router.navigate(['/users/prospects']);
  }
 

  DocumentosCargos() {
    const swalWithBootstrapButtons = swal.mixin({
    });

    swalWithBootstrapButtons.fire({
      title: 'Tu haz subido tus documentos requeridos',
      text: 'Puedes actualizar tus documentos o puedes salir de aqui, ',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Cargar mas',
      cancelButtonText: 'Continar',
      reverseButtons: true
    }).then((result) => {
      if (result.value) {
      } else if (
        /* Read more about handling dismissals below */
        result.dismiss === swal.DismissReason.cancel
      ) {
        this.router.navigate(['/users/profile']);
      }
    });
  }
}