import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BarraCliqueComponent } from './barra-clique.component';

describe('BarraCliqueComponent', () => {
  let component: BarraCliqueComponent;
  let fixture: ComponentFixture<BarraCliqueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BarraCliqueComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BarraCliqueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
