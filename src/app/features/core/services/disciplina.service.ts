import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Disciplina } from '../model/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/disciplinas`;

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  getDisciplinaById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  // --- NOVO MÉTODO ADICIONADO AQUI ---
  /**
   * Envia uma nova disciplina para ser criada no backend.
   * @param disciplina Os dados da nova disciplina do formulário.
   * @returns A disciplina recém-criada, retornada pelo backend.
   */
  criarDisciplina(disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }
}