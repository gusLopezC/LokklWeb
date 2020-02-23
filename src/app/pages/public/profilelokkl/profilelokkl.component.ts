import { Component, OnInit } from '@angular/core';

import { UsuarioService } from 'src/app/services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { Router, ActivatedRoute } from '@angular/router';
import { Tours } from 'src/app/models/tour.model';

@Component({
  selector: 'app-profilelokkl',
  templateUrl: './profilelokkl.component.html',
  styleUrls: ['./profilelokkl.component.css']
})
export class ProfilelokklComponent implements OnInit {
  id: { id: string; };
  usuario: Usuario;
  tours: Tours;
  cargando = true;
  tourCantidad: number;

  constructor(public _usuarioService: UsuarioService,
    public router: Router,
    private rutaActiva: ActivatedRoute, ) { }

  ngOnInit() {

    this.id = {
      id: this.rutaActiva.snapshot.params.id,
    };

    this.obtenerPerfil();

  }


  obtenerPerfil() {
    this.cargando = true;
    this._usuarioService.obtenerPerfilPublico(this.id.id)
      .subscribe((resp: any) => {
        this.usuario = resp.Usuario;
        this.tours = resp.Tours;
        this.tourCantidad = resp.CantidadTours;
        this.cargando = false;

      });
  }

}
