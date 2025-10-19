import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-clique',
  templateUrl: './barra-clique.component.html',
  styleUrls: ['./barra-clique.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BarraCliqueComponent {
  // --- INPUTS EXISTENTES ---
  @Input() materia?: any;
  @Input() referencia?: any;
  
  // --- NOVOS INPUTS PARA USO GENÉRICO ---
  @Input() title?: string; // Para exibir um texto qualquer, como "1 Semestre"
  @Input() showArrow?: boolean = false; // Para decidir se a seta de expansão aparece

  @Input() estaAberta?: boolean = false;
  @Output() barClicked = new EventEmitter<void>();

  onBarClick(): void {
    this.barClicked.emit();
  }
}