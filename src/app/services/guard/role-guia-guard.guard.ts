import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { CanActivate, Router } from '@angular/router';
import { UsuarioService } from '../service.index';

@Injectable({
  providedIn: 'root'
})
export class RoleGuiaGuardGuard implements CanActivate {

  constructor(
    public _usuarioService: UsuarioService,
    public router: Router
  ) {

  }

  canActivate() {

    if (this._usuarioService.user.role === 'GUIDE_ROLE') {
      return true;
    } else {
      this.router.navigate(['/home']);
      return false;
    }
  }
}
