import { Component, ElementRef, NgZone, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
 
@Component({
  selector: 'app-prospectos',
  templateUrl: './prospectos.component.html',
  styleUrls: ['./prospectos.component.css']
})
export class ProspectosComponent implements OnInit {




  //Banderas para formularios y campos
  public EscogerTipoFormulario= true;
  public FormularioTipo1= false;
  public FormularioTipo2= false;
  public BanderaIdioma = false;

 constructor(
  public router: Router,
 ) { }

  ngOnInit() {

  }


  mostrarTipoFormulario(opcion: number){
    if(opcion == 1){
      this.router.navigate(['users/prospects/empresa'])
    }
    if(opcion == 2){
      this.router.navigate(['users/prospects/personal'])
    }


  }

}
