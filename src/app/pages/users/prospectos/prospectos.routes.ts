import { RouterModule, Routes } from '@angular/router';
import { ProspectosEmpresaComponent } from './prospectos-empresa/prospectos-empresa.component';
import { ProspectosPersonalComponent } from './prospectos-personal/prospectos-personal.component';
import { ValidateempresaComponent } from './validate-identity/validateempresa/validateempresa.component';
import { ValidateIdentityComponent } from './validate-identity/validate-identity.component';
import { ProspectosComponent } from './prospectos.component';


// RoleGuiaVerificadoGuardGuard
const pagesRoutes: Routes = [

    /**
     * Prospectos
     */
    {
        path: '', pathMatch: 'full', component: ProspectosComponent
    },
    {
        path: 'empresa', pathMatch: 'full', component: ProspectosEmpresaComponent
    },
    {
        path: 'personal', pathMatch: 'full', component: ProspectosPersonalComponent
    },
    {
        path: 'validateIdentity', pathMatch: 'full', component: ValidateIdentityComponent
    },
    {
        path: 'validateEmpresa', pathMatch: 'full', component: ValidateempresaComponent
    },    

];

export const PROSPECTOS_ROUTES = RouterModule.forChild(pagesRoutes);
