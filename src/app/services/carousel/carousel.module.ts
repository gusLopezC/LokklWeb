import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { OwlcarouselDirective } from 'src/app/owlcarousel.directive';
// import { SpineerComponent } from '../../pages/common/spineer/spineer.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    // OwlcarouselDirective,
    // SpineerComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    // SpineerComponent,
    // OwlcarouselDirective,
    NgbModule,
  ],
})
export class CarouselModule { }