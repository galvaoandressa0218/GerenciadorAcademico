import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Disciplina } from '../model/disciplina.model';

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/disciplinas`;

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(disciplinasDoBackend => disciplinasDoBackend.map(d => ({
        id: d.id,
        descricao: d.descricao,
        nome: d.descricao,
        codigo: d.sigla,
        sigla: d.sigla,
        cargaHoraria: d.cargaHoraria,
        tipo: d.tipo,
        classificacao: d.classificacao,
        ativo: d.ativo,
        expanded: false
      } as Disciplina)))
    );
  }

  getDisciplinaById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  criarDisciplina(disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.post<Disciplina>(this.apiUrl, disciplina);
  }

  atualizarDisciplina(id: number, disciplina: Partial<Disciplina>): Observable<Disciplina> {
    return this.http.patch<Disciplina>(`${this.apiUrl}/${id}`, disciplina);
  }

  deletarDisciplina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}