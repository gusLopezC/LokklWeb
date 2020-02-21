import { Injectable } from '@angular/core';
import { UsuarioService } from '../usuarios/usuarios.service';


@Injectable({
  providedIn: 'root'
})
export class SidebarService {


  menu: any[] = [];
  constructor(public _usuarioService: UsuarioService) { }

}
