import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Usuario } from './../../../models/usuario.model';
import { Component, OnInit } from '@angular/core';
import { UsuarioService } from 'src/app/services/service.index';
import { Router } from '@angular/router';
import { AuthService, SocialUser } from 'angularx-social-login';
import { TranslateService } from '@ngx-translate/core';

// tslint:disable-next-line: no-conflicting-lifecycle
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {


  public user: SocialUser;
  public loggedIn: boolean;

  public checkStatus: boolean;
  usuario: Usuario;

  banderaMexico = false;
  banderaUSA = true;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    public router: Router,
    public _usuarioService: UsuarioService,
    private authService: AuthService,
    private translate: TranslateService
  ) {
    const browserLang = translate.getBrowserLang();

    translate.setDefaultLang(browserLang);
    translate.use(browserLang);
    this.changeLang(browserLang);
  }

  ngDoCheck() {
    this.checkStatus = this.localStorageItem();
    this.usuario = this._usuarioService.user;
  }

  ngOnInit() {
    this.usuario = this._usuarioService.user;
  }

  public localStorageItem(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token')) {
        return true;
      } else {
        return false;
      }
    }
  }

  changeLang(lang: string) {
    this.translate.use(lang);
    if (lang === 'en') {
      this.banderaUSA = false;
      this.banderaMexico = true;
    } else {
      this.banderaUSA = true;
      this.banderaMexico = false;
    }
  }

}
