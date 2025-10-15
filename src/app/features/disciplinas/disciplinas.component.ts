import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';

interface Disciplina {
  nome: string;
  codigo: string;
  curso: string;
  cargaHoraria: string;
  tipo: string;
  classificacao: string;
  descricao: string;
  expanded: boolean;
}

@Component({
  selector: 'app-disciplinas',
  standalone: true,
  imports: [
    CommonModule, 
    BotaoAdicionarComponent, // Botão de Adição
  ],
  templateUrl: './disciplinas.component.html',
  styleUrls: ['./disciplinas.component.css']
})
export class DisciplinasComponent {

  // Dados mockados de exemplo
  public disciplines = signal<Disciplina[]>([
    { 
      nome: 'Arquitetura de Software', 
      codigo: '(ARQS-20002)', 
      curso: 'Bes', 
      cargaHoraria: '60h', 
      tipo: 'presencial', 
      classificacao: 'Pratica', 
      descricao: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum', 
      expanded: false 
    },
    { nome: 'Arquitetura de Software', codigo: '(ARQS-20002)', curso: 'Bes', cargaHoraria: '60h', tipo: 'presencial', classificacao: 'Pratica', descricao: '', expanded: false },
    { nome: 'Arquitetura de Software', codigo: '(ARQS-20002)', curso: 'Bes', cargaHoraria: '60h', tipo: 'presencial', classificacao: 'Pratica', descricao: '', expanded: false },
    { nome: 'Arquitetura de Software', codigo: '(ARQS-20002)', curso: 'Bes', cargaHoraria: '60h', tipo: 'presencial', classificacao: 'Pratica', descricao: '', expanded: false },
    { nome: 'Arquitetura de Software', codigo: '(ARQS-20002)', curso: 'Bes', cargaHoraria: '60h', tipo: 'presencial', classificacao: 'Pratica', descricao: '', expanded: false },
  ]);

  toggleExpand(discipline: Disciplina): void {
    discipline.expanded = !discipline.expanded;
  }

  handleAddDiscipline(): void {
    console.log('Abrindo modal/formulario para adicionar disciplina...');
  }
}