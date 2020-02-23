import { PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';

import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

declare var google: any;

// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult {
    place_id: string;
    address_components: any; geometry
  }
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  private geoCoder;
  public ciudad: string;
  ciudadoption2: string;


  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  placeID: string;

  constructor(
    @Inject(PLATFORM_ID) private platformId: Object,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public router: Router,
  ) {
  }

  ngOnInit() {
    if (isPlatformBrowser(this.platformId)) {
      // load Places Autocomplete
      this.mapsAPILoader.load().then(() => {
        this.geoCoder = new google.maps.Geocoder;

        let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
          // types: ["address"]
        });
        autocomplete.addListener("place_changed", () => {
          this.ngZone.run(() => {
            // get the place result
            let place: google.maps.places.PlaceResult = autocomplete.getPlace();
            this.ciudad = place.address_components[0].long_name;
            this.placeID = place.place_id;
          });
        });
      });
    }
  }

  buscarTourCuidad() {

    if (this.ciudad == null || this.ciudad === '') {
      swal.fire('Por favor selecciona una ciudad', '', 'warning');
      return false;
    }
    this.router.navigate(['/tours/' + this.ciudad + '/' + this.placeID]);
  }

}
