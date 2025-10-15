import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizCurricularComponent } from './matriz-curricular.component';

describe('MatrizCurricularComponent', () => {
  let component: MatrizCurricularComponent;
  let fixture: ComponentFixture<MatrizCurricularComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrizCurricularComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatrizCurricularComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
