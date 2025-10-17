import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotaoEncaminharComponent } from './botao-encaminhar.component';

describe('BotaoEncaminharComponent', () => {
  let component: BotaoEncaminharComponent;
  let fixture: ComponentFixture<BotaoEncaminharComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BotaoEncaminharComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BotaoEncaminharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
