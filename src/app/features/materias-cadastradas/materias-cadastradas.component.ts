import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Disciplina } from '.././core/model/disciplina.model';
import { DisciplinaService } from '.././core/services/disciplina.service';
import { AuthService } from '.././core/services/auth.service';
import { ProgramaService } from '../core/services/programa.service'; // IMPORTAR
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarMateriaComponent } from '../../shared/pop-up-adicionar-materia/pop-up-adicionar-materia.component';

@Component({
  selector: 'app-materias-cadastradas',
  standalone: true,
  imports: [CommonModule, BotaoAdicionarComponent, PopUpAdicionarMateriaComponent],
  templateUrl: './materias-cadastradas.component.html',
  styleUrls: ['./materias-cadastradas.component.css']
})
export class MateriasCadastradasComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private authService = inject(AuthService); 
  private programaService = inject(ProgramaService); // INJETAR

  public materias = signal<Disciplina[]>([]);
  public isLoading = signal(true);
  public isModalVisible = signal(false);
  public selectedMateria = signal<Disciplina | null>(null);
  public isAdmin = this.authService.isAdmin;

  ngOnInit(): void {
    this.loadMaterias();
  }

  loadMaterias(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data) => {
        this.materias.set(data.map(d => ({ ...d, expanded: false })));
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erro ao buscar matérias cadastradas:", err);
        this.isLoading.set(false);
      }
    });
  }

  toggleExpand(materia: Disciplina): void {
    materia.expanded = !materia.expanded;
    if (materia.expanded && !materia.ementa) {
      this.programaService.getByDisciplinaId(materia.id).subscribe({
        next: (programa) => {
          materia.ementa = programa.ementa;
        },
        error: () => {
          materia.ementa = 'Não foi possível carregar a ementa.';
        }
      });
    }
  }

  openAddModal(): void {
    this.selectedMateria.set(null);
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  handleSaveNewDiscipline(disciplinaData: Partial<Disciplina>): void {
    const operation = disciplinaData.id
      ? this.disciplinaService.atualizarDisciplina(disciplinaData.id, disciplinaData)
      : this.disciplinaService.criarDisciplina(disciplinaData);

    operation.subscribe({
      next: () => {
        this.handleCloseModal();
        this.loadMaterias();
      },
      error: (err) => console.error('Erro ao salvar disciplina:', err)
    });
  }
  
  onEdit(materia: Disciplina): void {
    this.selectedMateria.set(materia);
    this.isModalVisible.set(true);
  }

  onDelete(materiaId: number): void {
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
      this.disciplinaService.deletarDisciplina(materiaId).subscribe({
        next: () => this.loadMaterias(),
        error: (err) => console.error('Erro ao excluir disciplina', err)
      });
    }
  }
}