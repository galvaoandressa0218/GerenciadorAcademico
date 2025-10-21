import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '.././core/services/auth.service';
import { ProfessorService } from '.././core/services/professor.service';
import { Professor } from '.././core/model/professor.model';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarProfessorComponent } from '../../shared/pop-up-adicionar-professor/pop-up-adicionar-professor.component';

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent,
    PopUpAdicionarProfessorComponent 
  ],
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  private authService = inject(AuthService);
  private professorService = inject(ProfessorService);

  public isAdmin = this.authService.isAdmin;
  public professors = signal<Professor[]>([]);
  public isLoading = signal(true);
  public isModalVisible = signal(false);
  public selectedProfessor = signal<Professor | null>(null);

  ngOnInit(): void {
    this.loadProfessors();
  }

  loadProfessors(): void {
    this.isLoading.set(true);
    this.professorService.getProfessores().subscribe({
      next: (data) => this.professors.set(data),
      error: (err) => console.error('Erro ao carregar professores:', err),
      complete: () => this.isLoading.set(false)
    });
  }

  openModalToAdd(): void {
    this.selectedProfessor.set(null);
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }
  
  handleEdit(professor: Professor): void {
    this.selectedProfessor.set(professor);
    this.isModalVisible.set(true);
  }

  handleSaveProfessor(professorData: Partial<Professor>): void {
    const operation = professorData.id
      ? this.professorService.atualizarProfessor(professorData.id, professorData)
      : this.professorService.criarProfessor(professorData);

    operation.subscribe({
      next: () => {
        this.handleCloseModal();
        this.loadProfessors();
      },
      error: (err) => console.error('Erro ao salvar professor:', err)
    });
  }

  handleDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir este professor?')) {
      this.professorService.deletarProfessor(id).subscribe({
        next: () => {
          this.professors.update(p => p.filter(prof => prof.id !== id));
        },
        error: (err) => console.error('Erro ao excluir professor:', err)
      });
    }
  }
}