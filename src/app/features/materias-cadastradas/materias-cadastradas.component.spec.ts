import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MateriasCadastradasComponent } from './materias-cadastradas.component';

describe('MateriasCadastradasComponent', () => {
  let component: MateriasCadastradasComponent;
  let fixture: ComponentFixture<MateriasCadastradasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MateriasCadastradasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MateriasCadastradasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
