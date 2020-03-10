import { Component, OnInit, NgZone } from '@angular/core';
import { SettingService } from '../../../services/service.index';

@Component({
  selector: 'app-aboutus',
  templateUrl: './aboutus.component.html',
  styleUrls: ['./aboutus.component.css']
})
export class AboutusComponent implements OnInit {

  // owlCarouselOptions: Object;

  constructor(
    private seo: SettingService) {
    this.setSeo();

  }

  ngOnInit() {
  }


  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- About us ', // Title Suffix
      description: 'Mediante nuestra plataforma podrás contratar el tour que tanto has deseado de una manera fácily segura, tú eliges cuándo, dónde y cómo. Te ofrecemos seguridad, confiabilidad y sobre todocalidad en nuestros servicios.', // Description
      image: 'https://lokkl.com/assets/img/logopeque.png', // Image
      keywords: 'guia, viaje, viajar, experiencia, travel, mexico, queretaro', // Keywords
      url: 'https://lokkl.com/aboutus'
    });
  }

}

