import { Component, ChangeDetectionStrategy, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { CalendarEvent } from 'angular-calendar';
import {
  isSameMonth,
  isSameDay,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  startOfDay,
  endOfDay,
  format
} from 'date-fns';
import { Observable } from 'rxjs';
import { colors } from './headercalender/colors';
// Extras
import { UsuarioService, } from 'src/app/services/service.index'
import { Usuario } from 'src/app/models/usuario.model';
import { URL_SERVICIOS } from 'src/app/config/config';



interface Calendario {
  order_nr: number;
  NameTour: string;
  Fechareserva: string;
}

function getTimezoneOffsetString(date: Date): string {

  const timezoneOffset = date.getTimezoneOffset();

  const hoursOffset = String(
    Math.floor(Math.abs(timezoneOffset / 60))
  ).padStart(2, '0');
  const minutesOffset = String(Math.abs(timezoneOffset % 60)).padEnd(2, '0');
  const direction = timezoneOffset > 0 ? '-' : '+';

  return `T00:00:00${direction}${hoursOffset}:${minutesOffset}`;
}

@Component({
  selector: 'app-calender',
  templateUrl: './calender.component.html',
  styleUrls: ['./calender.component.css']
})
export class CalenderComponent implements OnInit {
  usuario: Usuario;
  token: string;

  view: string = 'month';
  viewDate: Date = new Date();
  events$: Observable<Array<CalendarEvent<{ calendario: Calendario }>>>;
  locale: string;
  activeDayIsOpen: boolean = false;

  constructor(private http: HttpClient, public _usuarioService: UsuarioService, private translate: TranslateService) {
    this.usuario = this._usuarioService.user
    this.token = localStorage.getItem('token');

    const browserLang = translate.getBrowserLang();
    browserLang.match(/en|es/) ? browserLang : 'en';
    this.locale = browserLang;
  }

  ngOnInit(): void {
    this.fetchEvents();
  }

  fetchEvents(): void {
    const getStart: any = {
      month: startOfMonth,
      week: startOfWeek,
      day: startOfDay
    }[this.view];

    const getEnd: any = {
      month: endOfMonth,
      week: endOfWeek,
      day: endOfDay
    }[this.view];

    // Prueba
    const url = URL_SERVICIOS + '/api/reservaciones/obtenerReservacionesCalendario/' + this.usuario.id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json');
    headers = headers.set('Accept', 'application/json'),
      headers = headers.set('Authorization', 'Bearer ' + this.token);

    this.events$ =
      this.http.get(url, { headers }).pipe(
        map(((results: any) => {
          return results.Reservaciones.map((calendario: Calendario) => {
            return {
              title: calendario.NameTour,
              start: new Date(
                calendario.Fechareserva + getTimezoneOffsetString(this.viewDate)
              ),
              color: colors.blue,
              allDay: true,
              meta: {
                calendario
              }
            };
          });
        })
        ));
  }

  /**
   * Este metodo despliega los detalles de los eventos para la fecha seleccionada en caso de 
   * existir si no existen este no muestra nada
   */
  dayClicked({
    date,
    events
  }: {
    date: Date;
    events: Array<CalendarEvent<{ film: Calendario }>>;
  }): void {
    if (isSameMonth(date, this.viewDate)) {
      if (
        (isSameDay(this.viewDate, date) && this.activeDayIsOpen === true) ||
        events.length === 0
      ) {
        this.activeDayIsOpen = false;
      } else {
        this.activeDayIsOpen = true;
        this.viewDate = date;
      }
    }
  }
  /**
   * TODO:: Este metodo redireccionar cuando al desplegar sobre una fecha y hacer clic mandaria a la reservación
  */
  eventClicked(event: CalendarEvent<{ calendario: Calendario }>): void {
    window.open(
      `https://www.lokkl.com/users/myreservations/${event.meta.calendario.order_nr}`,
    );
  }



}
