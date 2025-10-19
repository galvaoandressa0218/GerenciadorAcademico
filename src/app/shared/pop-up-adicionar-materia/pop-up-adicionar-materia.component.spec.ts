import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarMateriaComponent } from './pop-up-adicionar-materia.component';

describe('PopUpAdicionarMateriaComponent', () => {
  let component: PopUpAdicionarMateriaComponent;
  let fixture: ComponentFixture<PopUpAdicionarMateriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarMateriaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAdicionarMateriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
