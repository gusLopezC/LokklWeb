import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

import { SocialUser } from 'angularx-social-login';
import { AuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';

import { Usuario } from 'src/app/models/usuario.model';
import { UsuarioService } from 'src/app/services/service.index';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private user: SocialUser;
  private loggedIn: boolean;

  public email = '';
  public password = '';

  constructor(
    public router: Router,
    // tslint:disable-next-line: variable-name
    public _usuarioService: UsuarioService,
    private authService: AuthService,
    private location: Location
  ) {
  }

  ngOnInit() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
    });
  }
  ingresar(forma: NgForm) {

    const usuario = new Usuario(null, forma.value.email, forma.value.password);

    this._usuarioService.login(usuario)
      .subscribe(correcto =>
        this.location.back()
        // this.router.navigate(['/users/account-welcome'])

      );
  }

  signInWithGoogle() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).then(user => {
      
      this._usuarioService.loginGoogle(user)
        .subscribe(resp =>
          this.location.back()
          // this.router.navigate(['/users/account-welcome'])

        );
    }
    );

  }

  signInWithFB(): void {
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).then(user =>
      this._usuarioService.loginGoogle(user)
        .subscribe(resp =>
          this.location.back()
          // this.router.navigate(['/users/account-welcome'])

        )
    );
  }

}
