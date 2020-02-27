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
      description: 'Your description', // Description
      image: 'https://lokkl.com/knoxpo/cover.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }

}
