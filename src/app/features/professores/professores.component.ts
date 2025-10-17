import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './../core/services/auth.service';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';

interface Professor {
  nome: string;
  instituicao: string;
  registro: string;
  dataCadastro: string;
  status: 'Ativo' | 'Inativo';
}

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
  // Injeta o serviço de autenticação
  private authService = inject(AuthService);
  
  // Propriedade para verificar se o usuário é administrador (mantida como na sua definição)
  public isAdmin = this.authService.isAdmin;

  // Definição do Signal tipado
  public professors = signal<Professor[]>([
    { nome: 'Glaucya Carreira Boechat', instituicao: 'UCSAL', registro: '0000000/UF', dataCadastro: '00/00/00', status: 'Ativo' },
    { nome: 'João da Silva', instituicao: 'UNEB', registro: '0000001/UF', dataCadastro: '01/01/01', status: 'Ativo' },
    { nome: 'Maria Souza', instituicao: 'UFBA', registro: '0000002/UF', dataCadastro: '02/02/02', status: 'Inativo' },
    { nome: 'Pedro Alvares', instituicao: 'UESC', registro: '0000003/UF', dataCadastro: '03/03/03', status: 'Ativo' },
    { nome: 'Carla Dias', instituicao: 'UNEB', registro: '0000004/UF', dataCadastro: '04/04/04', status: 'Ativo' },
  ]);

  handleAddProfessor(): void {
    console.log('Abrindo modal de adição de professor...');
  }
}
