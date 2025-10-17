import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component'; // Seu componente
import { Router } from '@angular/router'; // NECESSÁRIO para injetar o Router
import { NgFor } from '@angular/common';

// Interface de Dados
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
  selector: 'app-materias-cadastradas',
  standalone: true,
  imports: [CommonModule, BarraCliqueComponent, NgFor],
  templateUrl: './materias-cadastradas.component.html',
  styleUrls: ['./materias-cadastradas.component.css']
})
export class MateriasCadastradasComponent implements OnInit {
  
  // INJEÇÃO DO ROUTER
  private router = inject(Router);

  // Dados MOCK (para simular a lista do print)
  materiasCadastradas: Materia[] = Array(10).fill(0).map((_, i) => ({
    id: i + 1,
    nome: 'Arquitetura de Software',
    codigo: 'ARQS-20002',
    curso: 'Bes',
    cargaHoraria: 60,
    tipo: 'presencial',
    classificacao: 'Pratica'
  }));

  ngOnInit(): void {
    //
  }

  // FUNÇÃO DE NAVEGAÇÃO
  navigateToMateria(id: number): void {
    console.log(`Navegando para detalhes da Matéria ID: ${id}`);
    // Navega para /app/materia/{id}, por exemplo: /app/materia/1
    this.router.navigate(['/app/materia', id]);
  }
}
