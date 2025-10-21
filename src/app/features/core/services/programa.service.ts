import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

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
  private apiUrl = `${environment.apiUrl}/api/programas`;

  getAll(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.apiUrl);
  }

  getById(id: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/${id}`);
  }

  getByDisciplinaId(idDisciplina: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/disciplina/${idDisciplina}`);
  }

  create(programa: Programa): Observable<Programa> {
    return this.http.post<Programa>(this.apiUrl, programa);
  }

  update(id: number, programa: Programa): Observable<Programa> {
    return this.http.patch<Programa>(`${this.apiUrl}/${id}`, programa);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleAtivo(id: number, ativo: boolean): Observable<Programa> {
    return this.http.patch<Programa>(`${this.apiUrl}/${id}/status`, { ativo });
  }
}