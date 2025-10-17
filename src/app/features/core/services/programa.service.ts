import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface de um Programa (conforme DTOs do backend)
export interface Programa {
  id?: number;
  idDisciplina: number;
  ementa: string;
  objetivos: string;
  conteudo_programatico: string;
  metodologia: string;
  sistema_avaliacao: string;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/programas`;

  /**
   * Retorna todos os programas cadastrados
   */
  getAll(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.apiUrl);
  }

  /**
   * Retorna um programa específico pelo ID
   */
  getById(id: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retorna um programa específico da disciplina
   */
  getByDisciplinaId(idDisciplina: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/disciplina/${idDisciplina}`);
  }

  /**
   * Cria um novo programa
   */
  create(programa: Programa): Observable<Programa> {
    return this.http.post<Programa>(this.apiUrl, programa);
  }

  /**
   * Atualiza um programa existente
   */
  update(id: number, programa: Programa): Observable<Programa> {
    return this.http.put<Programa>(`${this.apiUrl}/${id}`, programa);
  }

  /**
   * Exclui um programa
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Ativa ou desativa um programa (opcional)
   */
  toggleAtivo(id: number, ativo: boolean): Observable<Programa> {
    return this.http.patch<Programa>(`${this.apiUrl}/${id}/status`, { ativo });
  }
}
