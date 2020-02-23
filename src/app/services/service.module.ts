import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import {
  UsuarioService,
  RecoveryPasswordService,
  ToursCiudadService,

/*
  SettingService,
  ProspectosService,
  CarouselModule,
  EmailService,
  GuiaService,
  ToursService,
  ComentariosService,
  PaymentService,
  ReservasService,
  ChatService,
  RegisterVisitService*/
} from './service.index';

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule
  ],
  providers: [
    UsuarioService,
    RecoveryPasswordService,
    ToursCiudadService,
   /*
    SettingService,
    ProspectosService,
    CarouselModule,
    EmailService,
    GuiaService,
    ToursService,
    ComentariosService,
    PaymentService,
    ReservasService,
    ChatService,
    RegisterVisitService*/
  ],
  declarations: []
})
export class ServiceModule { }
