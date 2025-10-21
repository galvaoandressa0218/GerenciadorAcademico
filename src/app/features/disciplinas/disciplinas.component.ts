import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarMateriaComponent } from '../../shared/pop-up-adicionar-materia/pop-up-adicionar-materia.component';
import { Disciplina } from '.././core/model/disciplina.model';
import { DisciplinaService } from './../core/services/disciplina.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent,
    PopUpAdicionarMateriaComponent
  ],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent implements OnInit {
  private disciplinaService = inject(DisciplinaService);
  private authService = inject(AuthService);
  
  public disciplines = signal<Disciplina[]>([]);
  public isLoading = signal(true);
  public isModalVisible = signal(false);
  public selectedDisciplina = signal<Disciplina | null>(null);
  public isAdmin = this.authService.isAdmin;

  ngOnInit(): void {
    this.loadDisciplinas();
  }

  loadDisciplinas(): void {
    this.isLoading.set(true);
    this.disciplinaService.getDisciplinas().subscribe({
      next: (data: Disciplina[]) => this.disciplines.set(data),
      error: (err: any) => console.error('Erro ao carregar disciplinas:', err),
      complete: () => this.isLoading.set(false)
    });
  }

  openModalToAdd(): void {
    this.selectedDisciplina.set(null);
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }
  
  handleEdit(disciplina: Disciplina): void {
    this.selectedDisciplina.set(disciplina);
    this.isModalVisible.set(true);
  }

  handleSaveDiscipline(disciplinaData: Partial<Disciplina>): void {
    const operation = disciplinaData.id
      ? this.disciplinaService.atualizarDisciplina(disciplinaData.id, disciplinaData)
      : this.disciplinaService.criarDisciplina(disciplinaData);

    operation.subscribe({
      next: () => {
        this.handleCloseModal();
        this.loadDisciplinas();
      },
      error: (err) => console.error('Erro ao salvar disciplina:', err)
    });
  }

  handleDelete(id: number | undefined): void {
    if (id === undefined) {
      console.error("ID inválido para exclusão.");
      return;
    }
    if (confirm('Tem certeza que deseja excluir esta disciplina?')) {
      this.disciplinaService.deletarDisciplina(id).subscribe({
        next: () => {
          this.disciplines.update(d => d.filter(disc => disc.id !== id));
        },
        error: (err) => console.error('Erro ao excluir disciplina:', err)
      });
    }
  }

  toggleExpand(discipline: Disciplina): void {
    discipline.expanded = !discipline.expanded;
  }
}