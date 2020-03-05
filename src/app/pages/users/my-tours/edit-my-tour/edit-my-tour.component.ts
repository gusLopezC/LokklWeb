import { Component, OnInit, ViewChild, ElementRef, NgZone } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';

import { Router, ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, FormBuilder, FormArray } from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';


import { Usuario } from 'src/app/models/usuario.model';
import { Tours } from 'src/app/models/tour.model';
import { ToursService, UsuarioService } from 'src/app/services/service.index';
import swal from 'sweetalert2';
import { ToursEdit } from 'src/app/models/touredit.model';

declare var google: any;

// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult {
    place_id: string;
    address_components: any; geometry
  }
}

@Component({
  selector: 'app-edit-my-tour',
  templateUrl: './edit-my-tour.component.html',
  styleUrls: ['./edit-my-tour.component.css']
})
export class EditMyTourComponent implements OnInit {


  miFormulario: FormGroup;
  usuario: Usuario;
  token: string;
  tour: Tours = new Tours('', '', '', '', '', '', '', '', null, null, null, '', '', '', '', null, null);


  public latitude: number;
  public longitude: number;
  public zoom: number;
  public address: number;
  private geoCoder;
  public ciudad: string;
  public pais: string;
  public placeID: string;
  public lenguajes: string;
  public CP: string = null;
  public coordenadasGoogle: string;
  mapaGoogleLat: number;
  mapaGoogleLon: number;
  slug: { slug: string };
  public fotos: File[] = [];
  files: File[] = [];
  cargando: boolean = true;
  public Editor = ClassicEditor;

  @ViewChild('search', { static: false })
  public searchElementRef: ElementRef;
  myGroup: FormGroup;

  constructor(
    private rutaActiva: ActivatedRoute,
    public router: Router,
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public _usuarioService: UsuarioService,
    public _toursService: ToursService,
    private fb: FormBuilder,
  ) {
    this.usuario = this._usuarioService.user;
    this.token = localStorage.getItem('token');

  }

  ngOnInit() {

    this.slug = {
      slug: this.rutaActiva.snapshot.params.slug,
    };

    this.cargarTour();

    this.miFormulario = this.fb.group({
      puntoInicio: [''],
      name: [''],
      schedulle: [''],
      categories: [''],
      duration: [''],
      currencyfield: [''],
      moneda: [''],
      itinerary: this.fb.array([this.fb.group({ itinerary: [''] })]),
      whatsIncluded: this.fb.array([this.fb.group({ whatsIncluded: [''] })])
    });

  }
  ngAfterViewInit() {
    setTimeout(() => {
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
            this.coordenadasGoogle = null;

            //

            // verify result
            if (place.geometry === undefined || place.geometry === null) {
              return;
            }

            // set latitude, longitude and zoom
            this.mapaGoogleLat = place.geometry.location.lat();
            this.mapaGoogleLon = place.geometry.location.lng();
            this.zoom = 15;
          });
        });
      });

    }, 5000);
  }



  cargarTour() {
    this.cargando = true;
    this._toursService.obtenerTour(this.slug.slug)
      .subscribe((resp: any) => {
        this.tour = resp.Tour;
        this.ciudad = this.tour.cuidad;
        this.pais = this.tour.pais;
        this.placeID = this.tour.placeID;
        this.lenguajes = this.tour.lenguajes;
        this.set_coordenadasMapa();
        this.cargando = false;
      });

    this.myGroup = new FormGroup({
      name: new FormControl(),
      cuidad: new FormControl()
    });
  }

  set_coordenadasMapa() {
    let cordenada = this.tour.mapaGoogle.split(',');
    this.mapaGoogleLat = +cordenada[0];
    this.mapaGoogleLon = +cordenada[1];

    this.coordenadasGoogle = this.tour.mapaGoogle;


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

  mandarDatosTourActualizado(formValue: any) {

    console.log(this.ciudad, this.pais, this.placeID)

    if (this.ciudad == null) {
      swal.fire('Por favor, seleccione una ciudad', '', 'warning');
      return false;
    }

    if (this.coordenadasGoogle == null) {
      swal.fire('Por favor seleccione el punto de encuentro en el mapa', '', 'warning');
      return false;
    }

    const tour = new ToursEdit(
      this.tour.id,
      this.usuario.id,
      this.ciudad,
      this.pais,
      this.placeID,
      this.coordenadasGoogle,
      formValue.value.puntoInicio,
      formValue.value.name,
      formValue.value.schedulle,
      this.tour.itinerary,
      this.tour.whatsIncluded,
      formValue.value.categories,
      formValue.value.duration,
      this.lenguajes,
      formValue.value.price,
      formValue.value.moneda
    );


    this._toursService.EditarTour(tour, this.fotos, this.token)
      .subscribe(
        resp =>
          this.router.navigate(['/users/myTours'])
      );
  }// end_mandarDatosTour


  eliminarFoto(id: string) {
    this._toursService.EliminarFoto(id, this.token)
      .subscribe(
        resp => {
          this.tour.get_photos = resp.Tour.get_photos;
        }
      );
  }

}
