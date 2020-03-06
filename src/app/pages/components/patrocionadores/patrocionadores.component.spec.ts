import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PatrocionadoresComponent } from './patrocionadores.component';

describe('PatrocionadoresComponent', () => {
  let component: PatrocionadoresComponent;
  let fixture: ComponentFixture<PatrocionadoresComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PatrocionadoresComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PatrocionadoresComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
