import { RouterModule, Routes } from '@angular/router';
import { CreateTourComponent } from './my-tours/create-tour/create-tour.component';
import { ProfileComponent } from './myaccount/profile/profile.component';
import { RoleGuiaVerificadoGuardGuard } from 'src/app/services/guard/role-guia-verificado-guard.guard';
import { MyReservationsComponent } from './reservaciones/my-reservations/my-reservations.component';
import { DatosGuidePaymentsComponent } from './myaccount/datos-guide-payments/datos-guide-payments.component';
import { MyToursComponent } from './my-tours/my-tours.component';
import { EditMyTourComponent } from './my-tours/edit-my-tour/edit-my-tour.component';
import { MyaccountComponent } from './myaccount/myaccount.component';
import { CalenderComponent } from './reservaciones/my-reservations/calender/calender.component';
import { MisViajesComponent } from './reservaciones/my-travels/mis-viajes/mis-viajes.component';
import { CancelReservationComponent } from './reservaciones/my-travels/cancel-reservation/cancel-reservation.component';
import { CancelTravelComponent } from './reservaciones/my-reservations/cancel-travel/cancel-travel.component';
import { ChatComponent } from './reservaciones/chat/chat.component';


// RoleGuiaVerificadoGuardGuard
const pagesRoutes: Routes = [

    {
        path: 'account-welcome', pathMatch: 'full', component: MyaccountComponent
    },
    {
        path: 'profile', pathMatch: 'full', component: ProfileComponent
    },
    {
        path: 'myTraverls', pathMatch: 'full', component: MisViajesComponent
    },
    {
        path: 'cancelmyTravel/:pedido', pathMatch: 'full', component: CancelTravelComponent
    },
    {
        path: 'DatosGuidePayments', pathMatch: 'full',  component: DatosGuidePaymentsComponent
    },


    /**
     * Rutas guias certificados
     */
    {
        path: 'myreservations', pathMatch: 'full', component: MyReservationsComponent
    },
    {
        path: 'cancelresertation/:pedido', pathMatch: 'full', component: CancelReservationComponent
    },
    {
        path: 'createtours', pathMatch: 'full', component: CreateTourComponent
    },
    {
        path: 'myTours', pathMatch: 'full', component: MyToursComponent
    },
    {
        path: 'edittour/:slug', pathMatch: 'full', component: EditMyTourComponent
    },
    {
        path: 'calender', pathMatch: 'full', canActivate: [RoleGuiaVerificadoGuardGuard], component: CalenderComponent
    },
    {
        path: 'chat/:pedido', pathMatch: 'full', component: ChatComponent
    },


    /**
     * Prospectos
     */

    {
        path: 'prospects', loadChildren: './prospectos/prospectos.module#ProspectosModule',
    },


];

export const USER_ROUTES = RouterModule.forChild(pagesRoutes);
