import { Component, OnInit, Input, } from '@angular/core';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-datepicker',
  templateUrl: './datepicker.component.html',
  styleUrls: ['./datepicker.component.css']
})
export class DatepickerComponent implements OnInit {

  @Input() tour: any;

  fecha: string;
  precioredondo: any;
  numberClients = 1;


  constructor(public router: Router, ) { }

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


  reservarTour(forma: NgForm) {

    this.router.navigate(['/payment/tour/' + this.tour.slug])


    this.fecha = forma.value.fecha.year + '-' + forma.value.fecha.month + '-' + forma.value.fecha.day;

    localStorage.removeItem('reserva');
    localStorage.setItem('reserva', JSON.stringify({
      fecha: this.fecha,
      cantidadTuristas: this.numberClients,
    }));

    this.router.navigate(['/payment/tour/' + this.tour.slug])
  }

}
