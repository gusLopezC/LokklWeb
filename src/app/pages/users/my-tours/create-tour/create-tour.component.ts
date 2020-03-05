import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { Usuario } from 'src/app/models/usuario.model';
import { Tours } from 'src/app/models/tour.model';
import { ToursService, UsuarioService } from 'src/app/services/service.index';
import { myOptionsIdiomas, myOptionsIdiomasEspaniol } from 'src/app/config/config';
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
  selector: 'app-create-tour',
  templateUrl: './create-tour.component.html',
  styleUrls: ['./create-tour.component.css']
})
export class CreateTourComponent implements OnInit {

  miFormulario: FormGroup;
  usuario: Usuario;
  token: string;
  listidiomas: any;
  listidiomasEspaniol: any;
  public BanderaIdioma = false;
  tour: Tours = new Tours('', '', '', '', '', '', '', '', '', null, null, null, '', '', '', '', null);

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public address: number;
  private geoCoder;
  public ciudad: string;
  public pais: string;
  public placeID: string = null;
  public coordenadasGoogle: string;
  public fotos: File[] = [];
  files: File[] = [];
  public Editor = ClassicEditor;


  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;

  constructor(
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public _usuarioService: UsuarioService,
    public _toursService: ToursService,
    private fb: FormBuilder,
    private translate: TranslateService
  ) {
    this.usuario = this._usuarioService.user;
    this.token = this._usuarioService.token;
    this.listidiomas = myOptionsIdiomas;
    this.listidiomasEspaniol = myOptionsIdiomasEspaniol;
    var browserLang = translate.getBrowserLang();

    if (browserLang = 'es') {
      this.BanderaIdioma = true;
    } else {
      this.BanderaIdioma = false;
    }

  }

  ngOnInit() {


    this.miFormulario = this.fb.group({
      puntoInicio: [''],
      name: [''],
      schedulle: [''],
      categories: [''],
      duration: [''],
      currencyfield: [''],
      moneda: [''],
      idiomas: [''],
      itinerary: this.fb.array([this.fb.group({ itinerary: [''] })]),
      whatsIncluded: this.fb.array([this.fb.group({ whatsIncluded: [''] })])
    });

    // set current position
    this.setCurrentPosition();
    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
      this.setCurrentLocation();
      this.geoCoder = new google.maps.Geocoder;

      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        // types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          // get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          this.ciudad = place.address_components[0].long_name;
          this.pais = place.address_components[2].long_name;
          this.placeID = place.place_id;

          //


          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 15;
        });
      });
    });
  }

  // Get Current Location Coordinates
  private setCurrentLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
        this.getAddress(this.latitude, this.longitude);
      });
    }
  }


  markerDragEnd($event: MouseEvent) {
    this.latitude = $event.coords.lat;
    this.longitude = $event.coords.lng;
    this.getAddress(this.latitude, this.longitude);
  }

  getAddress(latitude, longitude) {
    this.geoCoder.geocode({ 'location': { lat: latitude, lng: longitude } }, (results, status) => {
      if (status === 'OK') {
        if (results[0]) {
          this.zoom = 15;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }

  markerMoved(e) {
    const geocoder = new google.maps.Geocoder();
    geocoder.geocode({ 'location': e.coords }, (res, status) => {
      if (status === google.maps.GeocoderStatus.OK && res.length) { this.ngZone.run(() => this.setLocation(res[0])); }
    })
  }

  setLocation(place) {
    this.latitude = place.geometry.location.lat();
    this.longitude = place.geometry.location.lng();

    this.coordenadasGoogle = this.latitude + ',' + this.longitude;
  }

  private setCurrentPosition() {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.latitude = position.coords.latitude;
        this.longitude = position.coords.longitude;
        this.zoom = 15;
      });
    }
  }


  get getItinerarys() {
    return this.miFormulario.get('itinerary') as FormArray;
  }

  addItinerary() {
    const control = <FormArray>this.miFormulario.controls['itinerary'];
    control.push(this.fb.group({ itinerary: [] }));
  }

  removeItinerary(index: number) {
    const control = <FormArray>this.miFormulario.controls['itinerary'];
    control.removeAt(index);
  }

  get getwhatsIncludeds() {
    return this.miFormulario.get('whatsIncluded') as FormArray;
  }

  addwhatsIncluded() {
    const control = <FormArray>this.miFormulario.controls['whatsIncluded'];
    control.push(this.fb.group({ whatsIncluded: [] }));
  }

  removewhatsIncluded(index: number) {
    const control = <FormArray>this.miFormulario.controls['whatsIncluded'];
    control.removeAt(index);
  }

  /**
   * Carga de las imagenes
   */

  onFilesAdded(files: File[]) {

    this.fotos = files;
  }

  onFilesRejected(files: File) {
    swal.fire({
      icon: 'error',
      title: 'Oops...',
      text: 'Formato no válido',
    });
  }

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.fotos = this.files;
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
  }

  /**
 * Metodo que manda los datos para almacenar el tour hay que guardar tomar datos de
 * los metodos de arriba para poder obtener direccion al igual que
 * obtener datos del localStorage para guardar el id  vamos a obtener otros datos a travez
 * de la tabla de guias como los idiomas y demas
 */

  mandarDatosTour(formValue: any) {

    if (this.ciudad == null) {
      swal.fire('Por favor, seleccione una ciudad', '', 'warning');
      return false;
    }

    if (this.coordenadasGoogle == null) {
      swal.fire('Por favor seleccione el punto de encuentro en el mapa', '', 'warning');
      return false;
    }
    if (this.fotos.length < 1) {
      swal.fire('Sube algunas imágenes de tu recorrido.', '', 'warning');
      return false;
    }

    const tour = new Tours(
      this.usuario.id,
      this.ciudad,
      this.pais,
      this.placeID,
      this.coordenadasGoogle,
      formValue.value.puntoInicio,
      formValue.value.name,
      null,
      formValue.value.schedulle,
      formValue.value.itinerary,
      formValue.value.whatsIncluded,
      formValue.value.categories,
      formValue.value.duration,
      formValue.value.idiomas,
      formValue.value.currencyfield,
      formValue.value.moneda,
    );
    this._toursService.guardarDatosTour(tour, this.fotos, this.token)
      .subscribe(resp => {

        let timerInterval;
        swal.fire({
          title: 'Cargando tu información',
          timer: 4500,
          onBeforeOpen: () => {
            swal.showLoading()
          },
          onClose: () => {
            clearInterval(timerInterval)
          }
        }).then((result) => {
          if (
            /* Read more about handling dismissals below */
            result.dismiss === swal.DismissReason.timer
          ) {
          }
        });
        setTimeout(() => {
          this.router.navigate(['/users/myTours'])
          swal.fire({
            icon: 'success',
            title: 'Tu tour a sido creado',
            showConfirmButton: false,
            timer: 4500
          }
          );
        }, 4000);
      }


      );

  }// end_mandarDatosTour

}
