import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarReferenciasComponent } from './pop-up-adicionar-referencias.component';

describe('PopUpAdicionarReferenciasComponent', () => {
  let component: PopUpAdicionarReferenciasComponent;
  let fixture: ComponentFixture<PopUpAdicionarReferenciasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarReferenciasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAdicionarReferenciasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
