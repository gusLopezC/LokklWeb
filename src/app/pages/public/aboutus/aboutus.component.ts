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
      titleSuffix: '- About ', // Title Suffix
      description: 'Your description', // Description
      image: 'https://lokkl.com/knoxpo/cover.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }

}

