import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarProgramaComponent } from './pop-up-adicionar-programa.component';

describe('PopUpAdicionarProgramaComponent', () => {
  let component: PopUpAdicionarProgramaComponent;
  let fixture: ComponentFixture<PopUpAdicionarProgramaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarProgramaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAdicionarProgramaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
