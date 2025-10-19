import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarReferenciaComponent } from '../pop-up-adicionar-referencias/pop-up-adicionar-referencias.component';

describe('PopUpAdicionarReferenciaComponent', () => {
  let component: PopUpAdicionarReferenciaComponent;
  let fixture: ComponentFixture<PopUpAdicionarReferenciaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarReferenciaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAdicionarReferenciaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
