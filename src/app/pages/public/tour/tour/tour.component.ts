import { Component, OnInit } from '@angular/core';

import { ActivatedRoute } from '@angular/router';
import { NgForm, FormGroup } from '@angular/forms';
import { Title, Meta } from '@angular/platform-browser';

import { Router } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';
import { galleryConfiguration } from './configGallery';

import { ToursService, UsuarioService, ComentariosService, RegisterVisitService } from 'src/app/services/service.index';

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

  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];
  price: any;


  forma: FormGroup;
  idTour: any;

  constructor(
    private titleService: Title,
    private metaTagService: Meta,
    private rutaActiva: ActivatedRoute,
    public _toursService: ToursService,
    public _usuarioService: UsuarioService,
    public _comentarioService: ComentariosService,
    public _registerVisitService: RegisterVisitService,
  ) {
    this.usuario = this._usuarioService.user;
  }

  async ngOnInit() {

    this.galleryOptions = galleryConfiguration;

    this.slug = {
      slug: this.rutaActiva.snapshot.params.slug,
    };

    this.titleService.setTitle(this.slug.slug);
    this.cargando = true;

    await this._toursService.obtenerTour(this.slug.slug)
      .subscribe((resp: any) => {
        this.tour = resp.Tour;
        this.idTour = resp.Tour.id;
        this.tuGuia = resp.Guia[0];
        this.Comentarios = resp.Comentarios;
        this.price = this.tour.price;
        this.cargando = false;
        this.set_coordenadasMapa();
        this.galleryImages = this.getGalleryImages();
      });

    setTimeout(() => {
      this.guardarVisita();
    }, 5000);
  } // end ngInit


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



  guardarVisita() {

    if (this.usuario) {
      this._registerVisitService.guardarVisitaTour(this.idTour, this.usuario.id)
        .subscribe(resp => {
          console.log(resp);
        });
    }
  }



}
