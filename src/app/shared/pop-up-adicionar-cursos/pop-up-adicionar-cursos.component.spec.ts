import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarCursoComponent } from './pop-up-adicionar-cursos.component';

describe('PopUpAdicionarCursoComponent', () => {
  let component: PopUpAdicionarCursoComponent;
  let fixture: ComponentFixture<PopUpAdicionarCursoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarCursoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PopUpAdicionarCursoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
