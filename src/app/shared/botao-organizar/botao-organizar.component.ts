import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-botao-organizar',
  standalone: true, // Usando Standalone para fácil importação
  templateUrl: './botao-organizar.component.html',
  styleUrls: ['./botao-organizar.component.css']
})
export class BotaoOrganizarComponent {
  // Texto que aparece no botão (e.g., 'Organizar Matrizes')
  @Input() textoBotao: string = 'Filtrar/Organizar'; 
  
  // Evento emitido quando o botão é clicado
  @Output() acaoClicada = new EventEmitter<void>();

  onClick() {
    this.acaoClicada.emit();
  }
}
