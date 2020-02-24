import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { TranslateService } from '@ngx-translate/core';


import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { FormGroup } from '@angular/forms';


import { Usuario } from 'src/app/models/usuario.model';
import { Prospectos } from 'src/app/models/prospectos.model';
import { ProspectosService, UsuarioService } from 'src/app/services/service.index';
import { myOptionsIdiomas, myOptionsIdiomasEspaniol } from 'src/app/config/config';
import swal from 'sweetalert2';

declare var google: any;

// tslint:disable-next-line: no-namespace
declare namespace google.maps.places {
  export interface PlaceResult {
    formatted_address: string;
    place_id: string;
    address_components: any; geometry
  }
}

@Component({
  selector: 'app-prospectos-personal',
  templateUrl: './prospectos-personal.component.html',
  styleUrls: ['./prospectos-personal.component.css']
})
export class ProspectosPersonalComponent implements OnInit {

  forma: FormGroup;
  usuario: Usuario;
  token: string;
  prospecto: Prospectos = new Prospectos('', '', '', '', null, null, '', '', '', null, '', '', null, null);
  idiomas: any;
  idiomasEspaniol: any;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public address: number;
  private geoCoder;
  public ciudad: string;

  public BanderaIdioma = false;

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public router: Router,
    public _prospectosService: ProspectosService,
    public _usuarioService: UsuarioService,
    private translate: TranslateService) {
    this.usuario = this._usuarioService.user;
    this.token = this._usuarioService.token;
    this.idiomas = myOptionsIdiomas;
    this.idiomasEspaniol = myOptionsIdiomasEspaniol;
    var browserLang = translate.getBrowserLang();

    if (browserLang = 'es') {
      this.BanderaIdioma = true;
    } else {
      this.BanderaIdioma = false;
    }
    this.ciudad = '';
  }

    ngOnInit() {


    /**
     * Validar si el usuario ya esta registrado
     */
    this.comprobarProspectoRegistrado(this.usuario.email);

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

          this.ciudad = place.formatted_address;

          // verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          // set latitude, longitude and zoom
          this.latitude = place.geometry.location.lat();
          this.longitude = place.geometry.location.lng();
          this.zoom = 12;
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
        this.zoom = 8;
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
          this.zoom = 12;
          this.address = results[0].formatted_address;
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }

    });
  }


  mandarDatosProspectos(forma: NgForm) {
    if (this.ciudad == null || this.ciudad === '') {
      swal.fire('Por favor, seleccione una ciudad', '', 'warning');
      return false;
    }
    if (forma.value.edad == null) {
      swal.fire('Lo siento, tienes que ser mayor de edad.', '', 'warning');
      return false;
    }

    const prospecto = new Prospectos(
      this.usuario.id,
      'Persona',
      this.usuario.name,
      this.usuario.email,
      forma.value.telefonoContacto,
      forma.value.edad,
      this.ciudad,
      forma.value.eres_guia +','+ forma.value.trabajas_como_guia +','+ forma.value.certificacion_idiomas,
      forma.value.comoNosConociste,
      'Pendiente',
      'Pendiente',
      'Pendiente',
      'Pendiente',
      'Nuevo'
    );

    this._prospectosService.crearProspecto(prospecto, this.token)
      .subscribe(correcto => this.router.navigate(['/users/prospects/validateIdentity']));
  }


  comprobarProspectoRegistrado(email: string) {

    this._prospectosService.validaProspectoValidado(email, this.token)
      .subscribe(resp => {
        if (resp) {
          if (!(resp.email && !resp.document_identificacion)) {
            this.router.navigate(['/users/prospects/validateIdentity']);
          }
          if ((resp.email && !(resp.document_identificacion === 'Pendiente'))) {
            this.mensajeSacarAperfil();
          }
        }

      });
  }


  mensajeSacarAperfil() {
    swal.fire({
      icon: 'success',
      title: 'Felicidades',
      text: 'Su proceso se ha completado, nos pondremos en contacto con usted lo mas pronto posible.',
    });
    this.router.navigate(['/users/profile']);
  }

}