import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EmailService } from 'src/app/services/service.index';
@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  name: string;
  email: string;
  textomensaje: string;

  constructor(
    public _emailService: EmailService
  ) { }

  ngOnInit() {

  }

  enviarMensaje() {

    this._emailService.enviarMailContacto(this.name, this.email, this.textomensaje).subscribe();

  }
}
