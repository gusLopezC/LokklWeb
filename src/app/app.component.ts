import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { SettingService } from './services/service.index';

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
    private seo: SettingService,
    private translate: TranslateService,
  ) {
    const browserLang = translate.getBrowserLang();
    localStorage.setItem('lenguaje', browserLang);
    this.setSeo();
    translate.setDefaultLang('es');
    translate.use(browserLang)

  }

  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- Los mejores tours', // Title Suffix
      description: 'Your description', // Description
      image: 'https://lokkl.com/knoxpo/cover.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }


}