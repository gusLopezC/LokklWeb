import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService, SettingService } from '../../../services/service.index';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {

  name: string;
  email: string;
  textomensaje: string;

  constructor(
    public _emailService: EmailService,
    private seo: SettingService
  ) { }


  setSeo() {
    this.seo.setTags({
      title: 'Lokkl', // Title
      titleSuffix: '- Contacto ', // Title Suffix
      description: 'Your description', // Description
      image: 'https://lokkl.com/knoxpo/cover.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }
  enviarMensaje() {

    this._emailService.enviarMailContacto(this.name, this.email, this.textomensaje).subscribe();

  }
}
