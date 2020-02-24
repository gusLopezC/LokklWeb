import { RouterModule, Routes } from '@angular/router';
//Componentes

import { GetStartedComponent } from './public/get-started/get-started.component';
import { AboutusComponent } from './public/aboutus/aboutus.component';
import { ContactComponent } from './public/contact/contact.component';
import { BecomeguideComponent } from './public/becomeguide/becomeguide.component';
import { TourdetailsComponent } from './public/tour/tourdetails.component';
import { TourComponent } from './public/tour/tour/tour.component';
import { ProfilelokklComponent } from './public/profilelokkl/profilelokkl.component';

const pagesRoutes: Routes = [


    {
        path: 'getstarted', pathMatch: 'full', component: GetStartedComponent
    },
    {
        path: 'aboutus', pathMatch: 'full', component: AboutusComponent
    },
    {
        path: 'contact', pathMatch: 'full', component: ContactComponent
    },
    {
        path: 'becomeguide', pathMatch: 'full', component: BecomeguideComponent
    },
    {
        path: 'tours/:ciudad/:placeID', pathMatch: 'full', component: TourdetailsComponent
    },
    {
        path: 'profile/:id', pathMatch: 'full', component: ProfilelokklComponent
    },
    {
        path: 'tour/:slug', pathMatch: 'full', component: TourComponent
    },
    /*
    {
        path: 'payment', loadChildren: './public/tour/payment/payment.module#PaymentModule',
    },
    {
        path: 'comment', loadChildren: './public/tour/Comentary/comentary.module#ComentaryModule',
    },
    */
];

export const PAGES_ROUTES = RouterModule.forChild(pagesRoutes);