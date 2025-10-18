import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importe se não estiver standalone
import { MateriaService } from '../../features/core/services/materia.service'; // Importe o novo service
import { Materia } from '../core/model/materia.model';
@Component({
  selector: 'app-materias-cadastradas',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './materias-cadastradas.component.html',
  styleUrls: ['./materias-cadastradas.component.css']
})
export class MateriasCadastradasComponent implements OnInit {

  materiasCadastradas: Materia[] = []; // Tipado com a nova interface
  isLoading: boolean = true; // Variável para controle de loading

  private router = inject(Router);  
  private materiaService = inject(MateriaService); // Injeta o novo service

  ngOnInit(): void {
    // Chamada da API para preencher materiasCadastradas
    this.materiaService.getMaterias().subscribe({
      next: (data) => {
        this.materiasCadastradas = data;
        this.isLoading = false;
      },
      error: (err) => {
        console.error('Erro ao buscar matérias cadastradas:', err);
        this.isLoading = false;
      }
    });
  }

  navigateToMateria(id: number | string) {
    this.router.navigate(['/app/materia', id]);
  }
}