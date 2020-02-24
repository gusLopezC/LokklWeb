import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SelectModule } from 'ng-select';

import { NgxDropzoneModule } from 'ngx-dropzone';
import { PipesModule } from 'src/app/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';
import { AgmCoreModule } from '@agm/core';

//Rutas
import { PROSPECTOS_ROUTES } from './prospectos.routes';

//Componentes
import { ProspectosComponent } from './prospectos.component';
import { ProspectosEmpresaComponent } from './prospectos-empresa/prospectos-empresa.component';
import { ProspectosPersonalComponent } from './prospectos-personal/prospectos-personal.component';

import { ValidateempresaComponent } from './validate-identity/validateempresa/validateempresa.component';
import { ValidateIdentityComponent } from './validate-identity/validate-identity.component';
import { Verificador1Component } from './validate-identity/verificadores/verificador1/verificador1.component';
import { Verificador2Component } from './validate-identity/verificadores/verificador2/verificador2.component';
import { Verificador3Component } from './validate-identity/verificadores/verificador3/verificador3.component';
import { Verificador4Component } from './validate-identity/verificadores/verificador4/verificador4.component';


@NgModule({
  declarations: [
    ProspectosComponent,
    ProspectosEmpresaComponent,
    ProspectosPersonalComponent,
    ValidateempresaComponent,
    ValidateIdentityComponent,
    Verificador1Component,
    Verificador2Component,
    Verificador3Component,
    Verificador4Component,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    PROSPECTOS_ROUTES,
    SelectModule,
    NgxDropzoneModule,
    PipesModule,
    TranslateModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDJ-1MH4tKasGZGBdQ7Kp9LJqSSrTSy_Uo',
      libraries: ['places']
    })
    
  ]
})
export class ProspectosModule { }
