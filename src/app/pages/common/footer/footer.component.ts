import { Component, OnInit, Inject, OnDestroy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent implements OnInit, OnDestroy {

  cargando = true;
  //keep refs to subscriptions to be able to unsubscribe later


  constructor(
    public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object,
  ) {
    const browserLang = translate.getBrowserLang();
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang(browserLang);
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

    }

  }


  ngOnInit() {
    setTimeout(() => {
      this.cargando = false;
    }, 2000);

  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }

  ngOnDestroy() {
    // unsubscribe to cookieconsent observables to prevent memory leaks

  }
}
