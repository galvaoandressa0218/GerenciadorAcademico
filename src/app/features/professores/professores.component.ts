import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../features/core/services/auth.service';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { Professor } from '../../features/core/model/professor.model';
import { ProfessorService } from '../../features/core/services/professor.service'; // Importar o novo service

@Component({
  selector: 'app-professores',
  standalone: true,
  imports: [
    CommonModule,
    BotaoAdicionarComponent
  ],
  templateUrl: './professores.component.html',
  styleUrls: ['./professores.component.css']
})
export class ProfessoresComponent implements OnInit {
  // Injeção de dependências
  private authService = inject(AuthService);
  private professorService = inject(ProfessorService);

  public isAdmin = this.authService.isAdmin;
  public professors = signal<Professor[]>([]); // Inicializa como um array vazio

  ngOnInit(): void {
    this.carregarProfessores();
  }

  carregarProfessores(): void {
    this.professorService.getProfessores().subscribe({
      next: (data) => {
        // Mapeia a data para incluir a data de cadastro formatada, se necessário
        const professoresComData = data.map(p => ({
          ...p,
          dataCadastro: '00/00/00' // O backend não fornece, então usamos um placeholder
        }));
        this.professors.set(professoresComData);
      },
      error: (err) => {
        console.error('Erro ao carregar professores:', err);
        // Tratar o erro, talvez exibindo uma mensagem na tela
      }
    });
  }

  handleAddProfessor(): void {
    console.log('Abrindo modal de adição de professor...');
    // Aqui virá a lógica para abrir um formulário/modal
  }
}