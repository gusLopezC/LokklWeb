
import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';


import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { ToursService, UsuarioService } from 'src/app/services/service.index';
import { Tours } from 'src/app/models/tour.model';
import { DatosTourExtra } from '../../../models/DatosTourExtra.model';
import { TranslateService } from '@ngx-translate/core';

declare var google: any;

// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult {
    place_id: string;
    address_components: any; geometry
  }
}

@Component({
  selector: 'app-tourdetails',
  templateUrl: './tourdetails.component.html',
  styleUrls: ['./tourdetails.component.css']
})
export class TourdetailsComponent {

  tours: Tours[] = [];
  // DatosExtra: DatosTourExtra;
  ciudad: { ciudad: string };
  Existentours = false;
  NoExistentours = false;
  imagenfondo: string;
  public ciudadbusqueda: string;
  cargando = true;
  private geoCoder;




  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  placeID: string;
  browserLang: string;


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private rutaActiva: ActivatedRoute,
    public _toursService: ToursService,
    private translate: TranslateService,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public router: Router, ) {
    this.ciudad = {
      ciudad: this.rutaActiva.snapshot.params.ciudad,
    };
    this.buscarTour(this.rutaActiva.snapshot.paramMap.get('placeID'));
    this.browserLang = translate.getBrowserLang();
  }


  // tslint:disable-next-line: use-lifecycle-interface
  ngAfterViewInit() {
    if (isPlatformBrowser(this.platformId)) {

      setTimeout(() => {
        // load Places Autocomplete
        this.mapsAPILoader.load().then(() => {
          this.geoCoder = new google.maps.Geocoder;
          const autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
            // types: ["address"]
          });

          autocomplete.addListener('place_changed', () => {
            this.ngZone.run(() => {
              // get the place result
              let place: google.maps.places.PlaceResult = autocomplete.getPlace();
              this.ciudadbusqueda = place.address_components[0].long_name;
              this.placeID = place.place_id;

            });
          });
        });

      }, 5000);
    }
  }

  buscarTourCuidad() {

    if (this.ciudadbusqueda == null || this.ciudadbusqueda === '') {
      swal.fire('Por favor, seleccione una ciudad', '', 'warning');
      return false;
    }
    this.ciudad = {
      ciudad: this.ciudadbusqueda,
    };
    this.buscarTour(this.placeID);
    window.scroll(0, 0);
  }

  buscarTour(placeID: string) {
    this.cargando = true;
    this._toursService.buscarPorCiudad(placeID)
      .subscribe((resp: any) => {
        console.log(resp);
        if (resp.Tour.length > 0) {
          this.tours = resp.Tour;
          this.imagenfondo = resp.TourExtra.foto;


          this.Existentours = true;
          this.NoExistentours = false;
          this.cargando = false;
        } else {
          this.imagenfondo = resp.TourExtra.foto;
          this.Existentours = false;
          this.NoExistentours = true;
          this.cargando = false;
        }

      });
  }

}