import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarCursosComponent } from './pop-up-adicionar-cursos.component';

describe('PopUpAdicionarCursosComponent', () => {
  let component: PopUpAdicionarCursosComponent;
  let fixture: ComponentFixture<PopUpAdicionarCursosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarCursosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAdicionarCursosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
