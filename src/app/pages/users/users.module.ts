import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AgmCoreModule } from '@agm/core';
import { TranslateModule } from '@ngx-translate/core';

//Librerias
import { PipesModule } from 'src/app/pipes/pipes.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { registerLocaleData } from '@angular/common';
import localeEs from '@angular/common/locales/es';
import { CalendarModule, DateAdapter } from 'angular-calendar';
import { adapterFactory } from 'angular-calendar/date-adapters/date-fns';
import { CarouselModule } from 'src/app/services/service.index';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';

// Rutas
import { USER_ROUTES } from './users.routes';

// Componentenes
import { ProfileComponent } from './myaccount/profile/profile.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { DatosGuidePaymentsComponent } from './myaccount/datos-guide-payments/datos-guide-payments.component';

import { EditMyTourComponent } from './my-tours/edit-my-tour/edit-my-tour.component';
import { CreateTourComponent } from './my-tours/create-tour/create-tour.component';
import { MyToursComponent } from './my-tours/my-tours.component';

import { MyReservationsComponent } from './reservaciones/my-reservations/my-reservations.component';
import { MisViajesComponent } from './reservaciones/my-travels/mis-viajes/mis-viajes.component';
import { CancelReservationComponent } from './reservaciones/my-travels/cancel-reservation/cancel-reservation.component';
import { CancelTravelComponent } from './reservaciones/my-reservations/cancel-travel/cancel-travel.component';

import { CalenderComponent } from './reservaciones/my-reservations/calender/calender.component';
import { HeadercalenderComponent } from './reservaciones/my-reservations/calender/headercalender/headercalender.component';
import { ChatComponent } from './reservaciones/chat/chat.component';
import { ContactoEmergenciaComponent } from './myaccount/contacto-emergencia/contacto-emergencia.component';

// import { SharedModule } from './../common/shared.module';



registerLocaleData(localeEs);

@NgModule({
  declarations: [
    CreateTourComponent,
    ProfileComponent,
    MyToursComponent,
    MyReservationsComponent,
    MisViajesComponent,
    DatosGuidePaymentsComponent,
    EditMyTourComponent,
    MyaccountComponent,
    CalenderComponent,
    HeadercalenderComponent,
    CancelReservationComponent,
    CancelTravelComponent,
    ChatComponent,
    ContactoEmergenciaComponent,


  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    USER_ROUTES,
    SelectModule,
    NgxDropzoneModule,
    PipesModule,
    TranslateModule,
    CarouselModule,
    NgScrollbarModule,
    CKEditorModule,
    // SharedModule,
    CalendarModule.forRoot({
      provide: DateAdapter,
      useFactory: adapterFactory
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ-1MH4tKasGZGBdQ7Kp9LJqSSrTSy_Uo',
      libraries: ['places']
    })
  ]
})
export class UsersModule { }
