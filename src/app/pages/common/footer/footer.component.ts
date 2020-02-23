import { Component, OnInit, Inject } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';



import { PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';



@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
})
export class FooterComponent {


  constructor(public translate: TranslateService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    const browserLang = translate.getBrowserLang();
    if (isPlatformBrowser(this.platformId)) {
      translate.setDefaultLang(browserLang);
      translate.use(browserLang.match(/en|es/) ? browserLang : 'en');

    }

  }

  changeLang(lang: string) {
    this.translate.use(lang);
  }
}
