import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

import { NgxPayPalModule } from 'ngx-paypal';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CarouselModule } from 'src/app/services/service.index';
//Rutas
import { PAYMENT_ROUTES } from './payment.routes';
//Componentes
import { PaymentComponent } from './payment.component';




@NgModule({
  declarations: [
    PaymentComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    CarouselModule,
    TranslateModule,
    NgxPayPalModule,
    PAYMENT_ROUTES
  ]
})
export class PaymentModule { }
