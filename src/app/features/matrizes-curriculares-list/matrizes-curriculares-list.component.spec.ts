import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatrizesCurricularesListComponent } from './matrizes-curriculares-list.component';

describe('MatrizesCurricularesListComponent', () => {
  let component: MatrizesCurricularesListComponent;
  let fixture: ComponentFixture<MatrizesCurricularesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [MatrizesCurricularesListComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MatrizesCurricularesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
