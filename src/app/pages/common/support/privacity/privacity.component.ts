import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-privacity',
  templateUrl: './privacity.component.html',
  styleUrls: ['./privacity.component.css']
})
export class PrivacityComponent implements OnInit {

  constructor(public translate: TranslateService) {
    const browserLang = translate.getBrowserLang();

    if (browserLang === 'es') {
      this.cambiarIdioma = false;
    }
    if (browserLang === 'en') {
      this.cambiarIdioma = true;
    }
   }

  cambiarIdioma = false;

  ngOnInit() {
  }

  changeLang(opcion: string) {

    if (opcion === 'es') {
      this.cambiarIdioma = false;
    }
    if (opcion === 'en') {
      this.cambiarIdioma = true;
    }
  }

}
