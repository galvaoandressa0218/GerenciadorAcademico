import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface principal do professor (espelhando os DTOs do backend)
export interface Professor {
  id?: number;
  nome_completo: string;
  numero_registro: number;
  escola_vinculada: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/professores`;

  /**
   * Retorna todos os professores
   */
  getAll(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  /**
   * Retorna um professor específico
   */
  getById(id: number): Observable<Professor> {
    return this.http.get<Professor>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria um novo professor
   */
  create(professor: Professor): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor);
  }

  /**
   * Atualiza um professor existente
   */
  update(id: number, professor: Professor): Observable<Professor> {
    return this.http.put<Professor>(`${this.apiUrl}/${id}`, professor);
  }

  /**
   * Remove um professor
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Ativa ou desativa um professor (status)
   */
  toggleAtivo(id: number, ativo: boolean): Observable<Professor> {
    return this.http.patch<Professor>(`${this.apiUrl}/${id}/status`, { ativo });
  }

  /**
   * Retorna apenas professores ativos
   */
  getAtivos(): Observable<Professor[]> {
    return this.http.get<Professor[]>(`${this.apiUrl}?ativo=true`);
  }
}
