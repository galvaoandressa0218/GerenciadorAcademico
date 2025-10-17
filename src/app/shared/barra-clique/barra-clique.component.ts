import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

// A interface Materia deve ser definida ou importada aqui
// Vou definir a interface novamente aqui para garantir que o componente filho a reconheça.
interface Materia {
  id: number;
  nome: string;
  codigo: string;
  curso: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
}

@Component({
  selector: 'app-barra-clique',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './barra-clique.component.html',
  // O CSS deve estar aqui para os estilos laranjas
  styleUrls: ['./barra-clique.component.css'] 
})
export class BarraCliqueComponent {
  
  @Input() materia!: Materia; 

  @Input() label: string = '';
  
  // Evento de clique para notificar o componente pai
  @Output() barClicked = new EventEmitter<void>();
  
  @Input() Materia: Materia | null = null; // Para lista de matérias

  @Input() isHeader: boolean = false; // Flag para saber se é um cabeçalho de acordeão
  
  @Input() isOpen: boolean = false;    // Estado para girar a seta
}