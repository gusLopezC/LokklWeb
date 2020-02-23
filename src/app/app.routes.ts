import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { NopagefoundComponent } from './pages/common/nopagefound/nopagefound.component';
import { HomeComponent } from './pages/home/home.component';

import { LoginGuardGuard } from './services/guard/login-guard.guard';
import { BloqueaLoginGuard } from './services/guard/bloquea-login.guard';

const appRoutes: Routes = [

    {
        path: '', pathMatch: 'full', redirectTo: '/home'
    },
    {
        path: 'home', pathMatch: 'full', component: HomeComponent
    },
    {
        path: '',
        loadChildren: './pages/pages.module#PagesModule', data: { preload: true }
    },
    {
        path: 'login', canActivate: [BloqueaLoginGuard], loadChildren: './login/login.module#LoginModule',
    },
    {
        path: 'support', loadChildren: './pages/common/support/support.module#SupportModule',
    },
    /* {
         path: 'users',
         canActivate: [LoginGuardGuard],
         loadChildren: './pages/users/users.module#UsersModule'
     },*/
    { path: '**', component: NopagefoundComponent }

];


export const APP_ROUTES = RouterModule.forRoot(appRoutes, {
    scrollPositionRestoration: 'enabled',
    anchorScrolling: 'enabled',
    useHash: false,
    enableTracing: false, // <-- debugging purposes only
    preloadingStrategy: PreloadAllModules
});