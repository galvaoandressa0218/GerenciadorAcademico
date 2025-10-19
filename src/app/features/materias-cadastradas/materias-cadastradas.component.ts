import { Component, OnInit, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

import { Disciplina } from '.././core/model/disciplina.model';
import { DisciplinaService } from '.././core/services/disciplina.service';
import { AuthService } from '.././core/services/auth.service'; // Importar o AuthService
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
  private authService = inject(AuthService); // Injetar o AuthService
  private router = inject(Router);

  public materias = signal<Disciplina[]>([]);
  public isLoading = signal(true);
  public isModalVisible = signal(false);
  public expandedMateriaId = signal<number | null>(null);

  // Expõe a permissão de admin para o template
  public isAdmin = this.authService.isAdmin;

  ngOnInit(): void {
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data) => {
        this.materias.set(data);
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error("Erro ao buscar matérias cadastradas:", err);
        this.isLoading.set(false);
      }
    });
  }

  toggleExpand(materiaId: number): void {
    this.expandedMateriaId.update(currentId => currentId === materiaId ? null : materiaId);
  }

  openAddModal(): void {
    // Apenas admins podem adicionar novas disciplinas
    if (this.isAdmin) {
      this.isModalVisible.set(true);
    } else {
      alert('Apenas administradores podem adicionar novas disciplinas.');
    }
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  handleSaveNewDiscipline(disciplinaData: Partial<Disciplina>): void {
    this.disciplinaService.criarDisciplina(disciplinaData).subscribe({
      next: (disciplinaCriada) => {
        this.materias.update(current => [...current, disciplinaCriada]);
        this.handleCloseModal();
      },
      error: (err) => console.error('Erro ao salvar disciplina:', err)
    });
  }
  
  onEdit(materia: Disciplina): void {
    console.log('EDITAR matéria:', materia);
    // TODO: Implementar lógica para abrir um modal de edição
  }

  onDelete(materiaId: number): void {
    console.log('EXCLUIR matéria com ID:', materiaId);
    // TODO: Implementar lógica para chamar o serviço de exclusão
  }
}