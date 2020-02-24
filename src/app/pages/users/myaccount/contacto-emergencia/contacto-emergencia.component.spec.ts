import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ContactoEmergenciaComponent } from './contacto-emergencia.component';

describe('ContactoEmergenciaComponent', () => {
  let component: ContactoEmergenciaComponent;
  let fixture: ComponentFixture<ContactoEmergenciaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ContactoEmergenciaComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ContactoEmergenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
