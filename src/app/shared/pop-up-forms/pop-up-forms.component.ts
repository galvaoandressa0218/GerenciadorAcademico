import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pop-up',
  standalone: true,
  imports: [CommonModule, FormsModule], // <-- Adicionado FormsModule
  templateUrl: './pop-up-forms.component.html',
  styleUrls: ['./pop-up-forms.component.css']
})
export class PopUpComponent {
  // Título que será exibido no modal (ex: "Configurações de Ementa")
  @Input({ required: true }) title: string = 'Configurações';
  
  // Evento emitido quando o usuário clica para fechar o modal
  @Output() close = new EventEmitter<void>();
  
  // Evento emitido quando o botão de salvar é clicado
  @Output() save = new EventEmitter<void>();

  // Impede que o clique no modal feche o modal (necessário no HTML)
  stopPropagation(event: Event): void {
    event.stopPropagation();
  }
}
