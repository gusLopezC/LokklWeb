import { RouterModule, Routes } from '@angular/router';
//Componentes
import { PaymentComponent } from './payment.component';



const pagesRoutes: Routes = [


    {
        path: 'tour/:slug', pathMatch: 'full', component: PaymentComponent
    },


];

export const PAYMENT_ROUTES = RouterModule.forChild(pagesRoutes);
