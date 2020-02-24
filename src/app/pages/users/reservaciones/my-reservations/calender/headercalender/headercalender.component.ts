import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-headercalender',
  templateUrl: './headercalender.component.html',
  styleUrls: ['./headercalender.component.css']
})
export class HeadercalenderComponent {

  @Input() view: string;

  @Input() viewDate: Date;

  @Input() locale: string = 'es';

  @Output() viewChange: EventEmitter<string> = new EventEmitter();

  @Output() viewDateChange: EventEmitter<Date> = new EventEmitter();

}
