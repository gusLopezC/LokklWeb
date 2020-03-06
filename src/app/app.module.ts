import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

// Rutas
import { APP_ROUTES } from './app.routes';
import { PipesModule } from './pipes/pipes.module';

// Servicios
import { ServiceModule } from './services/service.module';

// Modulos externos
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './pages/common/shared.module';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { AgmCoreModule } from '@agm/core';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

// Componentes
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { CiudadesComponent } from './pages/home/ciudades/ciudades.component';
import { PatrocionadoresComponent } from './pages/components/patrocionadores/patrocionadores.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    CiudadesComponent,
    PatrocionadoresComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    HttpClientModule,
    APP_ROUTES,
    PipesModule,
    ServiceModule,
    SharedModule,
    FormsModule,
    InfiniteScrollModule,
    ReactiveFormsModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyCf6Ljjx-Oy_TK-mhgBF_NFT4M2rxut5jU',
      libraries: ['places']
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
