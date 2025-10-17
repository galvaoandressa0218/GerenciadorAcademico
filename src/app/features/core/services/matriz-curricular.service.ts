import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface das disciplinas que compõem uma matriz
export interface DisciplinaDetalhada {
  id?: number;
  nome: string;
  cargaHoraria: number;
  codigo: string;
  tipo: string;
  modalidade: string;
  pratica: boolean;
}

// Interface principal da Matriz Curricular
export interface MatrizCurricular {
  id?: number;
  nomeMatriz: string;
  turno: string;
  campus: string;
  habilitacao: string;
  horasComplementares: number;
  horasObrigatorias: number;
  horasEletivas: number;
  horasTcc: number;
  ativo: boolean;
  semestres?: {
    id: number;
    nome: string;
    disciplinas: DisciplinaDetalhada[];
  }[];
}

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/matrizes`;

  /**
   * Retorna todas as matrizes curriculares
   */
  getAll(): Observable<MatrizCurricular[]> {
    return this.http.get<MatrizCurricular[]>(this.apiUrl);
  }

  /**
   * Retorna uma matriz curricular específica
   */
  getById(id: number): Observable<MatrizCurricular> {
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova matriz curricular
   */
  create(matriz: MatrizCurricular): Observable<MatrizCurricular> {
    return this.http.post<MatrizCurricular>(this.apiUrl, matriz);
  }

  /**
   * Atualiza uma matriz curricular existente
   */
  update(id: number, matriz: MatrizCurricular): Observable<MatrizCurricular> {
    return this.http.put<MatrizCurricular>(`${this.apiUrl}/${id}`, matriz);
  }

  /**
   * Desativa ou exclui uma matriz
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retorna todas as disciplinas de uma matriz
   */
  getDisciplinasByMatrizId(id: number): Observable<DisciplinaDetalhada[]> {
    return this.http.get<DisciplinaDetalhada[]>(`${this.apiUrl}/${id}/disciplinas`);
  }
}
