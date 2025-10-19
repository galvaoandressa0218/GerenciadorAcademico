import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from '.././core/services/auth.service';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { Professor } from '.././core/model/professor.model'; // Importar o modelo

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
export class ProfessoresComponent {
  private authService = inject(AuthService);
  public isAdmin = this.authService.isAdmin;

  // Usar o modelo 'Professor' e remover os dados mock
  // Este sinal deve ser preenchido por uma chamada de serviço (ex: ProfessorService)
  public professors = signal<Professor[]>([]); 

  // TODO: Injetar um 'ProfessorService' e buscar os dados no ngOnInit

  constructor() {
    // Exemplo de como você preencheria com dados (substitua por chamada de API)
    this.professors.set([
        { id: 1, nome_completo: 'Glaucya Carreira Boechat', escola_vinculada: 'UCSAL', numero_registro: 12345, ativo: true },
        { id: 2, nome_completo: 'João da Silva', escola_vinculada: 'UNEB', numero_registro: 67890, ativo: true }
    ]);
  }

  handleAddProfessor(): void {
    console.log('Abrindo modal de adição de professor...');
  }
}