// barra-clique.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-botao-encaminhar',
  templateUrl: './botao-encaminhar.component.html',
  styleUrls: ['./botao-encaminhar.component.css'],
  standalone: true
})
export class BotaoEncaminharComponent {

  @Input() materia?: { id: number, nome: string, curso: string, cargaHoraria: number, tipo: string, classificacao: string };
  @Output() barClicked = new EventEmitter<void>();

  constructor(private router: Router) {}

  onRowClick() {
    
    this.barClicked.emit();


    if (this.materia?.id) {
      this.router.navigate(['/app/detalhe-materias', this.materia.id]);
    }
  }
}
