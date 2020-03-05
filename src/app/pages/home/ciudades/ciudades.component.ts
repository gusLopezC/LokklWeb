import { Component, OnInit, HostListener } from '@angular/core';
import { Router } from '@angular/router';

import { ToursCiudadService } from 'src/app/services/service.index';
import { Tours } from 'src/app/models/tour.model';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-ciudades',
  templateUrl: './ciudades.component.html',
  styleUrls: ['./ciudades.component.css']
})
export class CiudadesComponent {
  dataList: any;
  total: number;
  tours: Tours[] = [];
  numberPagination = 1;
  lastPage = 0;
  browserLang: string;


  constructor(
    public _toursCiudadService: ToursCiudadService,
    private translate: TranslateService,
    public router: Router,
  ) {
    this.browserLang = translate.getBrowserLang();
    this.obtenerPrimerosTour();
  }


  obtenerPrimerosTour() {
    this.dataList = [];
    this._toursCiudadService.obtenerTourScrollInfinite(this.numberPagination)
      .subscribe(resp => {
        this.total = resp.Tour.total;
        // tslint:disable-next-line: prefer-for-of
        for (let i = 0; i < resp.Tour.data.length; i++) {
          if (resp.Tour.data[i].lenguaje !== this.browserLang) {
            resp.Tour.data[i].name = resp.Tour.data[i].nameIngles;
          }

          this.dataList.push(resp.Tour.data[i]);
          this.lastPage = resp.Tour.last_page;


        }
        this.numberPagination++;
      });

  }
  /**
   *  Scroll obtener los otros
   */

  onScroll() {
    if (this.dataList.length > this.total) {
      console.log('Ya no ');
      return false;
    }

    if ((this.lastPage + 1) > this.numberPagination) {

      this._toursCiudadService.obtenerTourScrollInfinite(this.numberPagination)
        .subscribe(resp => {
          if (resp.Tour.current_page > resp.Tour.last_page) {
            console.log('Ya no ');
            return false;
          }
          // tslint:disable-next-line: prefer-for-of
          for (let i = 0; i < resp.Tour.data.length; i++) {
            this.dataList.push(resp.Tour.data[i]);
          }
        });
      this.numberPagination++;

    }

  }
}
