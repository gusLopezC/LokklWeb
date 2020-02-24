import { Component, OnInit } from '@angular/core';
import { ToursService, UsuarioService } from 'src/app/services/service.index';
import { Tours } from 'src/app/models/tour.model';
import { Usuario } from 'src/app/models/usuario.model';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-my-tours',
  templateUrl: './my-tours.component.html',
  styleUrls: ['./my-tours.component.css']
})
export class MyToursComponent implements OnInit {
  usuario: Usuario;
  tours: Tours;
  cargando = true;
  HayTours = false;
  NoHayTours = false;
  token: string;

  constructor(public _usuarioService: UsuarioService, public _toursService: ToursService, ) {
    this.usuario = this._usuarioService.user
    this.token = localStorage.getItem('token');
  }

  ngOnInit() {
    this.obtenerMisTours();
  }


  obtenerMisTours() {
    this._toursService.obtenerMisTour(this.usuario.id, this.token)
      .subscribe((resp: any) => {
        if (resp) {
          this.tours = resp.Tours;
          this.HayTours = true;
          this.NoHayTours = false;
        } else {
          this.HayTours = false;
          this.NoHayTours = true;
        }
        this.cargando = false;
      });
  }

  borrarTour(tour: Tours) {
    Swal.fire({
      title: '¿Estás seguro?',
      text: "No podrás revertir esto!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, bórralo!'
    }).then((result) => {
      if (result.value) {
        this._toursService.borrarTour(tour.id)
          .subscribe((resp: any) => {
            this.obtenerMisTours();
          });
      }
    })

  }

}
