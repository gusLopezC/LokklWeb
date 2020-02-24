import { Component, OnInit } from '@angular/core';
import { ProspectosService } from 'src/app/services/service.index';

@Component({
  selector: 'app-verificador4',
  templateUrl: './verificador4.component.html',
  styleUrls: ['./verificador4.component.css']
})
export class Verificador4Component implements OnInit {
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
