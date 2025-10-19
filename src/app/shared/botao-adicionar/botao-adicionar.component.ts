import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botao-adicionar', 
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-adicionar.component.html',
  styleUrls: ['./botao-adicionar.component.css']
})
export class BotaoAdicionarComponent {
  @Input() textoBotao: string = 'Ação';
  @Input() disabled: boolean = false;
  @Input() type: 'button' | 'submit' = 'button';
  @Output() clickEvent = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clickEvent.emit();
    }
  }
}
