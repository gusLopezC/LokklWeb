import { RouterModule, Routes } from '@angular/router';
import { PrivacityComponent } from './privacity/privacity.component';
import { TermsAndConditionsComponent } from './terms-and-conditions/terms-and-conditions.component';
import { HelpComponent } from './help/help.component';



const pagesRoutes: Routes = [
    { path: 'privacity', component: PrivacityComponent },
    { path: 'termsAndConditions', component: TermsAndConditionsComponent },
    { path: 'help', component: HelpComponent },

];

export const SUPPORT_ROUTES = RouterModule.forChild(pagesRoutes);
