import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
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

  /*
    SettingService,
    ProspectosService,
    GuiaService,
    ReservasService,
    ChatService,
    */
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
    EmailService,
    CarouselModule,
    ToursService,
    ComentariosService,
    RegisterVisitService,
    PaymentService,

    /*
     SettingService,
     ProspectosService,
     GuiaService,
     ReservasService,
     ChatService,
     */
  ],
  declarations: []
})
export class ServiceModule { }
