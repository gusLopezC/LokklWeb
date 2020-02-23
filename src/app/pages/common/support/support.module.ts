import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SUPPORT_ROUTES } from './support.routes';
import { TranslateModule } from '@ngx-translate/core';

import { PrivacityComponent } from './privacity/privacity.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HelpComponent } from './help/help.component';


@NgModule({
  declarations: [
    PrivacityComponent,
    TermsAndConditionsComponent,
    HelpComponent
  ],
  imports: [
    CommonModule,
    TranslateModule,
    SUPPORT_ROUTES
  ]
})
export class SupportModule { }
