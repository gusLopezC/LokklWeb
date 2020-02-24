import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ShareService } from '@ngx-share/core';
import { Router } from '@angular/router';
// import { NgxGalleryOptions, NgxGalleryImage } from 'ngx-gallery';
import { NgForm, FormGroup } from '@angular/forms';


import { ToursService, UsuarioService, ComentariosService, RegisterVisitService } from 'src/app/services/service.index';
import { Title, Meta } from '@angular/platform-browser';

import { Tours } from 'src/app/models/tour.model';
import { Guia } from 'src/app/models/guia.model';
import { Comentario } from 'src/app/models/comentario.model';
import { Usuario } from 'src/app/models/usuario.model';
import { URL_AWS } from 'src/app/config/config';

@Component({
  selector: 'app-tour',
  templateUrl: './tour.component.html',
  styleUrls: ['./tour.component.css']
})
export class TourComponent implements OnInit {

  tour: Tours;
  tuGuia: Usuario;
  Comentarios: Comentario;
  usuario: Usuario;


  mapaGoogleLat: number;
  mapaGoogleLon: number;
  slug: { slug: string };
  cargando = true;

  // galleryOptions: NgxGalleryOptions[];
  // galleryImages: NgxGalleryImage[];
  price: any;
  precioredondo: any;
  numberClients = 1;


  forma: FormGroup;
  fecha: string;
  idTour: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private rutaActiva: ActivatedRoute,
    public share: ShareService,
    public _toursService: ToursService,
    public _usuarioService: UsuarioService,
    public _comentarioService: ComentariosService,
    public _registerVisitService: RegisterVisitService,
    public router: Router, ) {
    console.log(share);
    this.usuario = this._usuarioService.user;
  }

  async ngOnInit() {
    this.slug = {
      slug: this.rutaActiva.snapshot.params.slug,
    };

    this.titleService.setTitle(this.slug.slug);


    this.cargando = true;

    await this._toursService.obtenerTour(this.slug.slug)
      .subscribe((resp: any) => {
        this.setMetaData(resp.Tour);
        this.tour = resp.Tour;
        this.idTour = resp.Tour.id;
        this.tuGuia = resp.Guia[0];
        this.Comentarios = resp.Comentarios;
        this.price = this.tour.price;
        this.precioredondo = this.price.toFixed(2);
        this.cargando = false;
        this.set_coordenadasMapa();
        //  this.galleryImages = this.getGalleryImages();
      });
    /*
        this.galleryOptions = [
          {
          },
          {
            width: '100%',
            height: '400px',
            imageAnimation: 'slide',
            'thumbnails': false,
            'previewZoom': true,
            'previewRotate': true,
            'previewFullscreen': true,
            'previewKeyboardNavigation': true,
            'previewCloseOnClick': true,
            'previewCloseOnEsc': true,
            'imageInfinityMove': true,
            'imagePercent': 75,
            'imageArrowsAutoHide': true,
          }
        ];
        */

    setTimeout(() => {
      this.guardarVisita();
    }, 5000);
  } // end ngInit

  guardarVisita() {

    if (this.usuario) {
      this._registerVisitService.guardarVisitaTour(this.idTour, this.usuario.id)
        .subscribe(resp => {
          console.log(resp);
        });
    }
  }

  setMetaData(seo: any) {
    this.titleService.setTitle('Conoce ' + seo.name);
    this.metaTagService.updateTag({ name: 'og:title', content: 'Conoce ' + seo.name });
    this.metaTagService.updateTag({ name: 'twitter:title', content: 'Conoce ' + seo.name });

    this.metaTagService.updateTag({ name: 'description', content: seo.schedulle });
    this.metaTagService.updateTag({ name: 'og:description', content: seo.schedulle });
    this.metaTagService.updateTag({ name: 'twitter:description', content: seo.schedulle });

    this.metaTagService.updateTag({ name: 'og:image', content: URL_AWS + '/images/tours/' + seo.get_photos[0].photo });
    this.metaTagService.updateTag({ name: 'og:image:secure_url', content: URL_AWS + '/images/tours/' + seo.get_photos[0].photo });
    this.metaTagService.updateTag({ name: 'twitter:image', content: URL_AWS + '/images/tours/' + seo.get_photos[0].photo });

  }

  getGalleryImages() {
    const images = [];
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.tour.get_photos.length; i++) {
      const photo = this.tour.get_photos[i];
      const cosa = JSON.stringify(photo)
      const cosa2 = JSON.parse(cosa)
      images.push({
        small: URL_AWS + '/images/tours/' + cosa2.photo,
        medium: URL_AWS + '/images/tours/' + cosa2.photo,
        big: URL_AWS + '/images/tours/' + cosa2.photo,
      });
    }
    return images;
  }

  set_coordenadasMapa() {
    const cordenada = this.tour.mapaGoogle.split(',');
    this.mapaGoogleLat = +cordenada[0];
    this.mapaGoogleLon = +cordenada[1];

  }

  onChange(numberClients) {
    this.precioredondo = this.tour.price;
    this.precioredondo = (this.precioredondo * numberClients).toFixed(2);
    this.numberClients = numberClients;

  }


  reservarTour(forma: NgForm) {

    this.fecha = forma.value.fecha.year + '-' + forma.value.fecha.month + '-' + forma.value.fecha.day;

    localStorage.removeItem('reserva');
    localStorage.setItem('reserva', JSON.stringify({
      fecha: this.fecha,
      cantidadTuristas: this.numberClients,
    }));

    this.router.navigate(['/payment/tour/' + this.tour.slug])
  }



}
