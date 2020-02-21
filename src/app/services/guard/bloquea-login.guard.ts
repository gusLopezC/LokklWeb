import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class BloqueaLoginGuard implements CanActivate {

  constructor(public _usuarioService: UsuarioService, public router: Router) { }
  canActivate() {
    
    if (this._usuarioService.estaLogueado()) {
      this.router.navigate(['/users/profile']);
      return false;
    } else {
     return true 
    }
  }
} 

