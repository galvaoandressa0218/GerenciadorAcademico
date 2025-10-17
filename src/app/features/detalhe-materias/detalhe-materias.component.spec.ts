import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetalheMateriasComponent } from './detalhe-materias.component';

describe('DetalheMateriasComponent', () => {
  let component: DetalheMateriasComponent;
  let fixture: ComponentFixture<DetalheMateriasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetalheMateriasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetalheMateriasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
