import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrganizarMatrizComponent } from './organizar-matriz.component';

describe('OrganizarMatrizComponent', () => {
  let component: OrganizarMatrizComponent;
  let fixture: ComponentFixture<OrganizarMatrizComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OrganizarMatrizComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(OrganizarMatrizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
