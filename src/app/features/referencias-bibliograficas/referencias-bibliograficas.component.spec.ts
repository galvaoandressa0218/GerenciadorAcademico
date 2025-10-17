import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReferenciasBibliograficasComponent } from './referencias-bibliograficas.component';

describe('ReferenciasBibliograficasComponent', () => {
  let component: ReferenciasBibliograficasComponent;
  let fixture: ComponentFixture<ReferenciasBibliograficasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReferenciasBibliograficasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ReferenciasBibliograficasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
