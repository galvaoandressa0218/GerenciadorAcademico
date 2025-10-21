import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Programa } from '../model/programa.model'; 

@Injectable({
  providedIn: 'root'
})
export class ProgramaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/programa`; 

  getAll(): Observable<Programa[]> {
    return this.http.get<Programa[]>(this.apiUrl);
  }

  getById(id: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/${id}`);
  }

  getByDisciplinaId(idDisciplina: number): Observable<Programa> {
    return this.http.get<Programa>(`${this.apiUrl}/disciplina/${idDisciplina}`); 
  }

  create(programa: Partial<Programa>): Observable<Programa> {
    const body = {
      ementa: programa.ementa,
      objetivos: programa.objetivos,
      conteudo_programatico: programa.conteudo_programatico,
      metodologia: programa.metodologia,
      sistema_avaliacao: programa.sistema_avaliacao,
      ativo: programa.ativo,
      professores_ids: programa.professores_ids
    };
    return this.http.post<Programa>(this.apiUrl, body);
  }

  update(id: number, programa: Partial<Programa>): Observable<Programa> {
    const body: any = {};
    if (programa.ementa !== undefined) body.ementa = programa.ementa;
    if (programa.objetivos !== undefined) body.objetivos = programa.objetivos;
    if (programa.conteudo_programatico !== undefined) body.conteudo_programatico = programa.conteudo_programatico;
    if (programa.metodologia !== undefined) body.metodologia = programa.metodologia;
    if (programa.sistema_avaliacao !== undefined) body.sistema_avaliacao = programa.sistema_avaliacao;
    if (programa.ativo !== undefined) body.ativo = programa.ativo;
    if (programa.professores_ids !== undefined) body.professores_ids = programa.professores_ids;
    
  
    return this.http.patch<Programa>(`${this.apiUrl}/${id}`, body);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  toggleAtivo(id: number, ativo: boolean): Observable<Programa> {

    // Este endpoint precisa ser implementado no BE para funcionar corretamente.
    return this.http.patch<Programa>(`${this.apiUrl}/${id}/status`, { ativo }); 
  }
}

export { Programa };
