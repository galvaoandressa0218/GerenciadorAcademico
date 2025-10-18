import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface para uma disciplina dentro da lista da matriz
export interface DisciplinaDetalhada {
  nome: string;
  cargaHoraria: number;
  codigo: string;
  tipo: string;
  modalidade: string;
  pratica: boolean;
}

// Interface para um semestre, que contém uma lista de disciplinas
export interface Semestre {
  id: number;
  nome: string;
  disciplinas: DisciplinaDetalhada[];
}

// Interface principal da Matriz Curricular, como esperado da API
export interface MatrizCurricular {
  id: number;
  nomeCurso: string;
  chComponentesComplementares: number;
  nome: string; // nome da matriz, ex: "Matriz V1"
  codigo: string;
  dataCriacao: string;
  status: 'Ativa' | 'Inativa';
  semestres: Semestre[];
}

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/matrizes-curriculares`; // Endpoint real

  // Busca uma matriz curricular específica pelo ID do curso/matriz
  public getMatrizById(id: number): Observable<MatrizCurricular> {
    // Faz a chamada GET real para o backend
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/${id}`);
  }
}