import { Injectable, inject, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, delay, tap } from 'rxjs';

// NOVO: Interface completa da Disciplina (necessária para as Linhas 45, 46, 48, 49 do HTML)
export interface DisciplinaDetalhada {
  nome: string;
  cargaHoraria: number;
  codigo: string;       // <--- CORRIGE ERRO DE CÓDIGO
  tipo: string;         // <--- CORRIGE ERRO DE TIPO
  modalidade: string;   // <--- CORRIGE ERRO DE MODALIDADE
  pratica: boolean;     // <--- CORRIGE ERRO DE PRÁTICA (Assumindo booleano)
  // Adicione outras propriedades da disciplina aqui
}

// Interface principal MatrizCurricular
export interface MatrizCurricular {
  id: number;
  // CORREÇÃO 1: Adicionando propriedades que estavam faltando no objeto principal
  nomeCurso: string; // <--- CORRIGE ERRO 'nomeCurso'
  chComponentesComplementares: number; // <--- CORRIGE ERRO 'chComponentesComplementares'

  nome: string;
  codigo: string;
  dataCriacao: string;
  disciplinas: number; 
  status: 'Ativa' | 'Inativa';
  semestres: { 
    id: number, 
    nome: string, 
    // CORREÇÃO 2: A lista de disciplinas agora usa a interface detalhada
    disciplinas: DisciplinaDetalhada[]
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
    // ... (restante do código do serviço)
    private http = inject(HttpClient);
    private apiUrl = 'localhost:8080'; // Sua URL de backend
  
    // Dados de mock (simulados) - Atualize para corresponder à nova estrutura!
    private mockMatriz: MatrizCurricular = {
        id: 1,
        nomeCurso: 'Sistemas de Informação', // Novo
        chComponentesComplementares: 200,    // Novo
        nome: 'Matriz de Exemplo V1',
        codigo: 'MTZ-001',
        dataCriacao: '2023-01-15',
        disciplinas: 15,
        status: 'Ativa',
        semestres: [
          { id: 1, nome: '1º Semestre', disciplinas: [
            { nome: 'Matemática Discreta', cargaHoraria: 60, codigo: 'DIS001', tipo: 'Obrigatória', modalidade: 'Presencial', pratica: false },
            { nome: 'Programação I', cargaHoraria: 80, codigo: 'PROG01', tipo: 'Obrigatória', modalidade: 'Presencial', pratica: true }
          ]},
         
        ]
    };
    
    // ... (restante dos métodos do serviço)
    public getMatrizByCourseId(id: number): Observable<MatrizCurricular> {
        return of(this.mockMatriz).pipe(
          delay(500), 
          tap(() => console.log(`[Service] Matriz ${id} carregada após delay.`))
        );
    }
}
