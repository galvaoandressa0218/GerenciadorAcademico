import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoOrganizarComponent } from './botao-organizar.component';

describe('BotaoOrganizarComponent', () => {
  let component: BotaoOrganizarComponent;
  let fixture: ComponentFixture<BotaoOrganizarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoOrganizarComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoOrganizarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
