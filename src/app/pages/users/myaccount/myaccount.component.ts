import { Component, OnInit } from '@angular/core';
import { UsuarioService, ProspectosService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router } from '@angular/router';
import swal from 'sweetalert2';


@Component({
  selector: 'app-myaccount',
  templateUrl: './myaccount.component.html',
  styleUrls: ['./myaccount.component.css']
})
export class MyaccountComponent implements OnInit {

  usuario: Usuario;
  token: string;

  MostrarModulo1 = false;
  MostrarModulo2 = false;
  MostrarModulo3 = false;

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router,
    public _prospectosService: ProspectosService, ) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.comprobarLLenadoFormulario(this.usuario.id);

  }

  comprobarLLenadoFormulario(id: string) {

    this._prospectosService.validaProspectoValidado(id, this.token)
      .subscribe(resp => {
        if (resp == null) {
          this.MostrarModulo1 = true;
          this.MostrarModulo2 = false;
          this.MostrarModulo3 = false;
        }
        if (resp) {

          if (resp.TipoProspecto == 'Persona') {
            if (resp.document_identificacion == 'Pendiente') {
              this.MostrarModulo2 = true;
              this.MostrarModulo1 = false;
            } else {
              this.MostrarModulo1 = false;
              this.MostrarModulo2 = false;
              this.MostrarModulo3 = true;
            }
          }
          if (resp.TipoProspecto == 'Empresa') {
            this.MostrarModulo2 = true;
            this.MostrarModulo3 = true;
          }

        }
      }


      );
  }

}
