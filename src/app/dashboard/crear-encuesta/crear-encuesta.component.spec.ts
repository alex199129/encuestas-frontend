import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CrearEncuestaComponent } from './crear-encuesta.component';

describe('CrearEncuestaComponent', () => {
  let component: CrearEncuestaComponent;
  let fixture: ComponentFixture<CrearEncuestaComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CrearEncuestaComponent]
    });
    fixture = TestBed.createComponent(CrearEncuestaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
