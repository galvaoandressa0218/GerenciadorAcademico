import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
// O FormGroup e FormBuilder não são mais necessários aqui
import { AuthService } from '.././core/services/auth.service';
import { ProfessorService } from '.././core/services/professor.service';
import { Professor } from '.././core/model/professor.model';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
// Importar o novo modal específico
import { PopUpAdicionarProfessorComponent } from '../../shared/pop-up-adicionar-professor/pop-up-adicionar-professor.component';

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent,
    PopUpAdicionarProfessorComponent // Adicionar o novo modal
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

  ngOnInit(): void {
    this.professorService.getProfessores().subscribe({
      next: (data) => this.professors.set(data),
      error: (err) => console.error('Erro ao carregar professores:', err),
      complete: () => this.isLoading.set(false)
    });
  }

  openModalToAdd(): void {
    // Apenas abre o modal, a lógica de desabilitar o botão está no HTML
    this.isModalVisible.set(true);
  }

  handleCloseModal(): void {
    this.isModalVisible.set(false);
  }

  // Recebe os dados do formulário do evento (save) do modal filho
  handleSaveProfessor(professorData: Partial<Professor>): void {
    this.professorService.criarProfessor(professorData).subscribe({
      next: (novoProfessor) => {
        this.professors.update(listaAtual => [...listaAtual, novoProfessor]);
        this.handleCloseModal();
      },
      error: (err) => console.error('Erro ao salvar professor:', err)
    });
  }
}