import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component';
import { Router } from '@angular/router';
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
  selector: 'app-materias',
  standalone: true,
  // CORREÇÃO: BarraCliqueComponent DEVE estar no imports
  imports: [CommonModule, BarraCliqueComponent, NgFor], 
  templateUrl: './materias-cadastradas.component.html',
  styleUrls: ['./materias-cadastradas.component.css']
})
export class MateriasCadastradasComponent implements OnInit {
  
  // SOLUÇÃO: Injetar o serviço Router
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

  navigateToMateria(id: number): void {
    console.log(`Navegando para detalhes da Matéria ID: ${id}`);
    

    // Isso navegará para uma rota como: /materia/1, /materia/2, etc.
    this.router.navigate(['/materia', id]);
  }
}
