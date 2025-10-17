import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PopUpFormsComponent } from './pop-up-forms.component';

describe('PopUpFormsComponent', () => {
  let component: PopUpFormsComponent;
  let fixture: ComponentFixture<PopUpFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PopUpFormsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PopUpFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
