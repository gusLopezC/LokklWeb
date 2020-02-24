import { Component, OnInit } from '@angular/core';
import { ProspectosService } from 'src/app/services/service.index';

@Component({
  selector: 'app-verificador3',
  templateUrl: './verificador3.component.html',
  styleUrls: ['./verificador3.component.css']
})
export class Verificador3Component implements OnInit {
  files: File[] = [];


  constructor(public _prospectoService: ProspectosService) { }

  ngOnInit() {
  }


  onSelect(event,campo: string) {
    this.files.push(...event.addedFiles);
    this._prospectoService.subirArchivos(this.files[0],  campo).subscribe();
	}

	onRemove(event) {
		this.files.splice(this.files.indexOf(event), 1);
	}

}
