import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgxMaterialCookieComplianceModule } from 'ngx-material-cookie-compliance';


import { HeaderComponent } from './header/header.component';
import { NopagefoundComponent } from './nopagefound/nopagefound.component';
import { FooterComponent } from './footer/footer.component';


import { PipesModule } from 'src/app/pipes/pipes.module';

import { SocialLoginModule, AuthServiceConfig, LoginOpt } from 'angularx-social-login';
import { GoogleLoginProvider, FacebookLoginProvider } from 'angularx-social-login';



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
    imports: [
        RouterModule,
        CommonModule,
        PipesModule,
        SocialLoginModule,
        TranslateModule,
        NgxMaterialCookieComplianceModule
    ],
    declarations: [
        NopagefoundComponent,
        HeaderComponent,
        FooterComponent,

    ],
    exports: [
        NopagefoundComponent,
        HeaderComponent,
        FooterComponent,

    ],
    providers: [
        {
            provide: AuthServiceConfig,
            useFactory: provideConfig
        }
    ],
})

export class SharedModule { }