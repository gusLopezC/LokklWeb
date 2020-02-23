import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { ToursCiudadService } from 'src/app/services/service.index';
import { Tours } from 'src/app/models/tour.model';

@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent {
  dataList: any;
  numberPagination = 1;
  total: number;
  tours: Tours[] = [];

  constructor(
    public _toursCiudadService: ToursCiudadService,
    public router: Router,
  ) {
    this.dataList = [];
    this._toursCiudadService.obtenerTourScrollInfinite(this.numberPagination)
      .subscribe(resp => {
        this.total = resp.Tour.total;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.Tour.data.length; i++) {
          this.dataList.push(resp.Tour.data[i]);
        }
        this.numberPagination++;
      });
  }

  onScroll(e) {
    console.log(this.numberPagination);
    if (this.dataList.length > this.total) {
      console.log('Ya no ');
      return false;
    }


    this._toursCiudadService.obtenerTourScrollInfinite(this.numberPagination)
      .subscribe(resp => {
        console.log(resp);
        if (resp.Tour.current_page > resp.Tour.last_page) {
          console.log('Ya no ');
          return false;
        }
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.Tour.data.length; i++) {
          this.dataList.push(resp.Tour.data[i]);
        }
        // console.log(this.dataList);
      });
    this.numberPagination++;
  }

  /*obtenerToursPopulares() {
    this.cargando = true;
    this._toursCiudadService.obtenerToursPopulares()
      .subscribe((resp: any) => {
        if (resp.Tour.length > 0) {
          this.toursPeru = resp.Tour;
          this.cargando = false;
        }
      });
  }

  obtenerToursPeru() {
    this.cargando = true;
    this._toursCiudadService.obtenerToursCiudad('Perú')
      .subscribe((resp: any) => {
        if (resp.Tour.length > 0) {
          this.toursPeru = resp.Tour;
          this.cargando = false;
        }
      });
  }

  obtenerToursMexico() {
    this.cargando = true;
    this._toursCiudadService.obtenerToursCiudad('México')
      .subscribe((resp: any) => {
        if (resp.Tour.length > 0) {
          this.toursMexico = resp.Tour;
          this.cargando = false;
        }
      });
  }*/


  obtenerToursScroll() {

  }

}
