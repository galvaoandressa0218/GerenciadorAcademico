import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpTriploComponent } from './pop-up-triplo.component';

describe('PopUpTriploComponent', () => {
  let component: PopUpTriploComponent;
  let fixture: ComponentFixture<PopUpTriploComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpTriploComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpTriploComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
