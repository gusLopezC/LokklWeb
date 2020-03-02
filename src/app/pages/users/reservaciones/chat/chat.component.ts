import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { UsuarioService, ChatService, ReservasService } from '../../../../services/service.index';
import { Usuario } from 'src/app/models/usuario.model';
import { NgScrollbar } from 'ngx-scrollbar';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent {

  @ViewChild(NgScrollbar, { static: true }) scrollbarRef: NgScrollbar;
  @ViewChild('comments', { static: true }) commentsSection: ElementRef;
  reserva: any;
  roomkey: string;

  userId = '';
  message: string;
  chats = [];
  token: string;
  user: Usuario;
  nameGuia: any;
  evento: NgScrollbar;
  fotoContrario: any;

  constructor(
    private _usuarioService: UsuarioService,
    public _reservasService: ReservasService,
    public _ChatService: ChatService,
    public route: ActivatedRoute,
    private router: Router,
    private el: ElementRef) {
    this.route.queryParams.subscribe(params => {
      if (this.router.getCurrentNavigation().extras.state) {
        this.reserva = this.router.getCurrentNavigation().extras.state.reserva;
        this.nameGuia = this.router.getCurrentNavigation().extras.state.nameGuia;
        this.fotoContrario = this.reserva.get_guia[0].img;
      }
    });
  }

  async ngAfterViewInit() {
    this.user = await this._usuarioService.user;
    this.obtenerMensajes();
    if (this.scrollbarRef) {
      this.evento = this.scrollbarRef;
    }
  }

  async obtenerMensajes() {

    if (this.reserva.order_nr) {
      this.reserva.id_reservacion = this.reserva.id;
    }

    this._ChatService.obtenerChatReservacion(this.reserva.id)
      .subscribe(resp => {
        if (resp.Mensajes.length > 0) {
          this.chats = resp.Mensajes;
        }
      });
    setTimeout(() => {
      this.scrollbarRef.scrollTo({ bottom: 0 });
    }, 500);
  }

  async sendChatMessage() {
    if (this.message == null || this.message === 'null') {
      this.scrollTo();
      return false;
    }
    /*
        this._ChatService.sendMessage(this.reserva, this.message)
          .subscribe(resp => {
            this.message = '';
            if (resp.Mensajes.length > 0) {
              this.chats = resp.Mensajes;
            }
            setTimeout(() => {
              // this.scrollTo('.endVista');
              this.scrollToEnd();
            }, 1000);
          });*/
  }

  scrollTo() {
    if (this.scrollbarRef) {
      setTimeout(() => {
        this.scrollbarRef.scrollTo({ bottom: 0 });
      }, 500);

    }

  }


}


