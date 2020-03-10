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
      description: 'Localizarnos es fácil y rápido ya que nos encontramos en todas las redes sociales y en todos los formatos de comunicación.', // Description
      image: 'https://lokkl.com/assets/img/logopeque.png', // Image
      keywords: 'mobile, android, ios, swift, cloud development' // Keywords
    });
  }
  enviarMensaje() {

    this._emailService.enviarMailContacto(this.name, this.email, this.textomensaje).subscribe();

  }
}
