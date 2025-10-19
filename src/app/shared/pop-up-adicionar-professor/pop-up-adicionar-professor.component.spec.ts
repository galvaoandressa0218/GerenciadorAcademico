import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpAdicionarProfessorComponent } from './pop-up-adicionar-professor.component';

describe('PopUpAdicionarProfessorComponent', () => {
  let component: PopUpAdicionarProfessorComponent;
  let fixture: ComponentFixture<PopUpAdicionarProfessorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpAdicionarProfessorComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpAdicionarProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
