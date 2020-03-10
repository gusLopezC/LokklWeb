import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/service.index';


@Component({
  selector: 'app-becomeguide',
  templateUrl: './becomeguide.component.html',
  styleUrls: ['./becomeguide.component.css']
})
export class BecomeguideComponent implements OnInit {

  constructor(
    private seo: SettingService) {
    this.setSeo();
  }

  ngOnInit() {
  }

  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- Become a Guide ', // Title Suffix
      description: 'Nuestros guías lokkl están preparados y capacitados para ofrecerte verdaderas experiencias llenas de cultura, historia y tradiciones inmersas de la verdadera esencia que sólo una persona conocedora y nativa del lugar te puede ofrecer.', // Description
      image: 'https://lokkl.com/assets/img/logopeque.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development', // Keywords
      url: 'https://lokkl.com/becomeguide'
    });
  }
}
