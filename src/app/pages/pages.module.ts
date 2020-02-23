// Librerias
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RecaptchaModule } from 'ng-recaptcha';
import { RecaptchaFormsModule } from 'ng-recaptcha';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';
import { ShareModule } from '@ngx-share/core';
import { ShareButtonsModule } from '@ngx-share/buttons';
// import { NgxGalleryModule } from 'ngx-gallery';


// Rutas
// import { PAGES_ROUTES } from './pages.routes';
import { PipesModule } from '../pipes/pipes.module';


// Componentes
/*
import { GetStartedComponent } from './public/get-started/get-started.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { ContactComponent } from './public/contact/contact.component';
import { BecomeguideComponent } from './public/becomeguide/becomeguide.component';
import { MosaicoComponent } from './public/aboutus/mosaico/mosaico.component';
import { TourdetailsComponent } from './public/tour/tourdetails.component';
import { TourComponent } from './public/tour/tour/tour.component';
import { CarouselModule } from '../services/carousel/carousel.module';
import { ProfilelokklComponent } from './public/profilelokkl/profilelokkl.component';
*/


@NgModule({
    declarations: [
       /* GetStartedComponent,
        AboutusComponent,
        ContactComponent,
        BecomeguideComponent,
        MosaicoComponent,
        TourdetailsComponent,
        TourComponent,
        ProfilelokklComponent,*/
    ],
    exports: [
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        // PAGES_ROUTES,
        PipesModule,
        RecaptchaModule,
        RecaptchaFormsModule,
        // CarouselModule,
        TranslateModule,
        ShareModule,
        ShareButtonsModule,
        // NgxGalleryModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyDJ-1MH4tKasGZGBdQ7Kp9LJqSSrTSy_Uo',
            libraries: ['places']
        })

    ]
})
export class PagesModule { }