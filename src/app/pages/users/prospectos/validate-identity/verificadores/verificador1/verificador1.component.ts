import { Component, OnInit } from '@angular/core';
import { ProspectosService, UsuarioService } from 'src/app/services/service.index';


@Component({
  selector: 'app-verificador1',
  templateUrl: './verificador1.component.html',
  styleUrls: ['./verificador1.component.css']
})
export class Verificador1Component implements OnInit {

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
