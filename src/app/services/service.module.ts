import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  UsuarioService,
  RecoveryPasswordService,
  ToursCiudadService,
  EmailService,
  CarouselModule,
  ToursService,
  ComentariosService,
  RegisterVisitService,
  PaymentService,
  ProspectosService,
  ReservasService,
  GuiaService,

  /*
    SettingService,
    GuiaService,
    ChatService,
    */
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
  ],
  providers: [
    UsuarioService,
    RecoveryPasswordService,
    ToursCiudadService,
    EmailService,
    CarouselModule,
    ToursService,
    ComentariosService,
    RegisterVisitService,
    PaymentService,
    ProspectosService,
    ReservasService,
    GuiaService,

    /*
     SettingService,
     ChatService,
     */
  ],
  declarations: []
})
export class ServiceModule { }
