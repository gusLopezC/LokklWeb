import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RecoveryPassoerdComponent } from './recovery-passoerd/recovery-passoerd.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';



const pagesRoutes: Routes = [
    { path: '', component: LoginComponent },
    { path: 'register', component: RegisterComponent },
    { path: 'recoverypassword', component: RecoveryPassoerdComponent },
    { path: 'reset/:token', component: ResetPasswordComponent },

];

export const LOGIN_ROUTES = RouterModule.forChild(pagesRoutes);
