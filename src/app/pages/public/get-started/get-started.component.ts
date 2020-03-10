import { Component, OnInit } from '@angular/core';
import { SettingService } from 'src/app/services/service.index';


@Component({
  selector: 'app-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.css']
})
export class GetStartedComponent implements OnInit {

  constructor(
    private seo: SettingService) {
    this.setSeo();
  }

  ngOnInit() { }


  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- Get started ', // Title Suffix
      description: 'Reserva tours en cualquier parte del mundo,en LOKKL encuentra los mejores tours con guías certificados.Ahorra dinero y disfruta de los mejores lugares.', // Description
      image: 'assets/img/logopeque.png', // Image
      keywords: 'guia, viaje, viajar, experiencia, travel, mexico, queretaro', // Keywords
      url: 'https://lokkl.com/home'
    });
  }

}
