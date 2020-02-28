import { Component, OnInit, Input, } from '@angular/core';
import { Router, NavigationExtras } from '@angular/router';
import * as moment from 'moment';
import swal from 'sweetalert2';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {


  @Input() tour: any;

  startDate = new Date();
  horaInicio: string;
  fecha: string;
  precioredondo: any;
  numberClients = 1;


  constructor(public router: Router) {
  }

  ngOnInit(): void {

    this.precioredondo = this.tour.price;
  }



  increment() {
    this.numberClients++;
    this.precioredondo = this.tour.price;
    this.precioredondo = (this.precioredondo * this.numberClients).toFixed(2);
  }

  decrement() {
    if (this.numberClients === 1) {
      return false;
    }
    if (this.numberClients > 1) {
      this.numberClients--;
      this.precioredondo = this.tour.price;
      this.precioredondo = (this.precioredondo * this.numberClients).toFixed(2);
    }
  }


  reservarTour() {

    console.log(this.startDate);
    console.log(this.horaInicio);

    if (this.horaInicio == null || this.horaInicio === '') {
      swal.fire(
        'Importante',
        'Selecicona la hora de inicio de tu tour',
        'warning');

      return false;
    }

    const momentObj = moment(this.startDate);
    const dateInFormat = momentObj.format('YY-MM-DD');

    console.log(dateInFormat);

    let navigationExtras: NavigationExtras = {
      state: {
        fecha: dateInFormat,
        cantidadTuristas: this.numberClients,
        tour: this.tour
      }
    };

    this.router.navigate(['/payment/tour/' + this.tour.slug], navigationExtras);

  }

}