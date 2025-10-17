import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface base (ajuste conforme o seu backend)
export interface Disciplina {
  id?: number;
  nome: string;
  codigo: string;
  curso?: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
  descricao?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/disciplinas`;

  /**
   * Retorna todas as disciplinas
   */
  getAll(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  /**
   * Retorna uma disciplina específica
   */
  getById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova disciplina
   */
  create(disciplina: Disciplina): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }

  /**
   * Atualiza uma disciplina existente
   */
  update(id: number, disciplina: Disciplina): Observable<Disciplina> {
    return this.http.put<Disciplina>(`${this.apiUrl}/${id}`, disciplina);
  }

  /**
   * Exclui uma disciplina
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
