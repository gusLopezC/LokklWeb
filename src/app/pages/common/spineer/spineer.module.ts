import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SpineerComponent } from './spineer.component';



@NgModule({
  entryComponents: [
    SpineerComponent
  ],
  declarations: [
    SpineerComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    SpineerComponent
  ]
})
export class SpineerModule { }
