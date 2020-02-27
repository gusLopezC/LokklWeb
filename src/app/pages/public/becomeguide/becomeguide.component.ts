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
      description: 'Your description', // Description
      image: 'https://lokkl.com/knoxpo/cover.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }
}
