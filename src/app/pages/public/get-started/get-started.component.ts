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
      description: 'Lokkl es la mejor manera para contratar guías mediante una app en la que podrás diseñar los trayectos de tours individuales o en grupo a la medida que más se adecue a tu viaje para conocer y disfrutar de la manera más amena posible un lugar, solo planifica de la mejor manera tu agenda de viaje para conocer y disfrutar cualquier lugar del mundo junto a un LOKKL. Y no se te olvide compartir tus experiencias para que más viajeros alrededor del mundo no se queden sin disfrutar de esta nueva manera de conocer el mundo.', // Description
      image: 'https://lokkl.com/assets/img/logopeque.png', // Image
      keywords: 'guia, viaje, viajar, experiencia, travel, mexico, queretaro', // Keywords
      url: 'https://lokkl.com/getstarted'
    });
  }

}
