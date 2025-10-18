import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Disciplina } from '../model/disciplina.model'; // Importar o modelo unificado

@Injectable({
  providedIn: 'root'
})
export class DisciplinaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/disciplinas`;

  /**
   * Busca a lista de todas as disciplinas.
   * A API deve retornar uma lista com os campos básicos.
   */
  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<Disciplina[]>(this.apiUrl);
  }

  /**
   * Busca os detalhes completos de UMA disciplina pelo seu ID.
   * A API deve retornar um objeto com todos os campos, incluindo o programa.
   */
  getDisciplinaById(id: number): Observable<Disciplina> {
    return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);
  }

  /**
   * Salva uma seção específica do programa da disciplina.
   */
  saveSecao(disciplinaId: number, secao: string, novoConteudo: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${disciplinaId}/programa`, {
      secaoAAtualizar: secao,
      conteudo: novoConteudo
    });
  }
}