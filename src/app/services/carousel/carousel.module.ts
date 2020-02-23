import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
// import { OwlcarouselDirective } from 'src/app/owlcarousel.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';


@NgModule({
  declarations: [
    // OwlcarouselDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    // OwlcarouselDirective,
    NgbModule,
  ],
})
export class CarouselModule { }