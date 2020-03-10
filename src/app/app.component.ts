import { Component } from '@angular/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './services/service.index';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';


declare var gtag;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Los mejores tours';

  /**
   *
   */
  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private seo: SettingService,
    private translate: TranslateService,
    private router: Router
  ) {

    this.setLenguage();
    this.analitycs();
    this.setSeo();


  }

  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- Los mejores tours', // Title Suffix
      description: 'Reserva tours en cualquier parte del mundo,en LOKKL encuentra los mejores tours con guías certificados.Ahorra dinero y disfruta de los mejores lugares.', // Description
      image: 'assets/img/logopeque.png', // Image
      keywords: 'guia, viaje, viajar, experiencia, travel, mexico, queretaro', // Keywords
      url:'https://lokkl.com/home'
    });
  }

  analitycs() {
    if (isPlatformBrowser(this.platformId)) {

      const navEndEvents$ = this.router.events
        .pipe(
          filter(event => event instanceof NavigationEnd)
        );

      navEndEvents$.subscribe((event: NavigationEnd) => {
        gtag('config', 'UA-147775364-1', {
          'page_path': event.urlAfterRedirects
        });
      });//end googleAnalitycs
    }
  }

  setLenguage() {
    if (isPlatformBrowser(this.platformId)) {

      const browserLang = this.translate.getBrowserLang();
      localStorage.setItem('lenguaje', browserLang);
      this.translate.setDefaultLang('es');
      this.translate.use(browserLang)
    }
  }

}