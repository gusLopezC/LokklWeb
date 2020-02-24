import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { MapsAPILoader, MouseEvent } from '@agm/core';
import { TranslateService } from '@ngx-translate/core';

import { Router } from '@angular/router';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';

import { Usuario } from 'src/app/models/usuario.model';
import { ProspectosEmpresa } from 'src/app/models/prospectosEmpresa.model';

import { ProspectosService, UsuarioService } from 'src/app/services/service.index';
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
  selector: 'app-prospectos-empresa',
  templateUrl: './prospectos-empresa.component.html',
  styleUrls: ['./prospectos-empresa.component.css']
})
export class ProspectosEmpresaComponent implements OnInit {

  public forma: FormGroup;
  usuario: Usuario;
  token: string;
  prospecto: ProspectosEmpresa = new ProspectosEmpresa('', '', '', '', '', '', '', '', '', '', '', '');
  idiomas: any;
  idiomasEspaniol: any;

  public latitude: number;
  public longitude: number;
  public zoom: number;
  public address: number;

  public ciudad: string;

  public BanderaIdioma = false;

  @ViewChild("search", { static: false })
  public searchElementRef: ElementRef;

  constructor(
    private mapsAPILoader: MapsAPILoader,
    private ngZone: NgZone,
    public router: Router,
    private formBuilder: FormBuilder,
    public _prospectosService: ProspectosService,
    public _usuarioService: UsuarioService,
    private translate: TranslateService) {
    this.usuario = this._usuarioService.user;
    this.token = this._usuarioService.token;

    this.forma = this.formBuilder.group({
      'nombreempresa': [null, Validators.compose([Validators.required])],
      'nombreempresaLegal': [null, Validators.compose([Validators.required])],
      'sitioweb': [null],
      'telefono': [null, Validators.compose([Validators.required])],
      'correoempresacontacto': [null, Validators.compose([Validators.required])],
      'ciudad': [null, Validators.compose([Validators.required])],
      'CP': [null, Validators.compose([Validators.required])],
      'dirección': [null, Validators.compose([Validators.required])],
      'nombreContacto': [null, Validators.compose([Validators.required])],
      'puestoTrabajo': [null, Validators.compose([Validators.required])],
      'telefonocontacto':[null, Validators.compose([Validators.required])],
    });
  }

  ngOnInit() {

    this.comprobarProspectoRegistrado(this.usuario.email);

    // load Places Autocomplete
    this.mapsAPILoader.load().then(() => {
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

  mandarDatosProspectosEmpresa() {

    /*if (this.ciudad == null || this.ciudad === '') {
      swal.fire('Por favor, seleccione una ciudad', '', 'warning');
      return false;
    }*/

    const prospecto = new ProspectosEmpresa(
      this.usuario.id,
      'Queretaro',
      //this.ciudad,
      'Empresa',
      this.forma.value.nombreempresa,
      this.forma.value.nombreempresaLegal,
      this.forma.value.correoempresacontacto,
      this.forma.value.ciudad,
      this.forma.value.CP,
      this.forma.value.dirección,
      this.forma.value.nombreContacto,
      this.forma.value.puestoTrabajo,
      this.forma.value.telefonocontacto,
      this.forma.value.telefono,
      this.forma.value.sitioweb
    );

    console.log(prospecto);

    this._prospectosService.crearProspectoEmpresa(prospecto, this.token)
      .subscribe(correcto => this.router.navigate(['/users/createtours']));
  }

  comprobarProspectoRegistrado(email: string) {

    this._prospectosService.validaProspectoValidado(email, this.token)
      .subscribe(resp => {
        if (resp) {
          if (!(resp.email)) {
            this.router.navigate(['/users/createtours']);
          }
        }
      });
  }

}
