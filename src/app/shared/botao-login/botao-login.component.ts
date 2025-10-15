import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-botao-login',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './botao-login.component.html',
  styleUrls: ['./botao-login.component.css']
})
export class BotaoLoginComponent {
  @Input() textoBotao: string = 'Ação';
  @Input() disabled: boolean = false;
  @Output() clickEvent = new EventEmitter<void>();

  handleClick() {
    if (!this.disabled) {
      this.clickEvent.emit();
    }
  }
}
