// Modulos

import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { TranslateModule } from '@ngx-translate/core';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';

// Rutas
import { LOGIN_ROUTES } from './login.routes';

// Componentes
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPassoerdComponent } from './recovery-passoerd/recovery-passoerd.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';

let config = new AuthServiceConfig([
  {
    id: GoogleLoginProvider.PROVIDER_ID,
    provider: new GoogleLoginProvider('465413657620-tmn5kl4kgal8baujig6au40fhku94csd.apps.googleusercontent.com')
  },
  {
    id: FacebookLoginProvider.PROVIDER_ID,
    provider: new FacebookLoginProvider('812641425798592')
  }
]);

export function provideConfig() {
  return config;
}

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    RecoveryPassoerdComponent,
    ResetPasswordComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RecaptchaFormsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    SocialLoginModule,
    TranslateModule,
    LOGIN_ROUTES
  ],
  providers: [
    {
      provide: AuthServiceConfig,
      useFactory: provideConfig
    }
  ],
})
export class LoginModule { }
