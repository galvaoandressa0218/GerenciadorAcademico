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
  private apiUrl = `${environment.apiUrl}/disciplina`;

  getDisciplinas(): Observable<Disciplina[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(disciplinasDoBackend => disciplinasDoBackend.map(d => ({
        id: d.id_disciplina, 
        descricao: d.descricao, 
        nome: d.descricao, 
        codigo: d.sigla, 
        cargaHoraria: d.carga_horaria, 
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
    
    const body = {
      sigla: disciplina.codigo,
      descricao: disciplina.nome,
      carga_horaria: disciplina.cargaHoraria,
      tipo: disciplina.tipo,
      classificacao: disciplina.classificacao,
        };
    return this.http.post<Disciplina>(this.apiUrl, body);
  }

  atualizarDisciplina(id: number, disciplina: Partial<Disciplina>): Observable<Disciplina> {
    const body: any = {};
    if (disciplina.nome) body.descricao = disciplina.nome;
    if (disciplina.codigo) body.sigla = disciplina.codigo;
    if (disciplina.cargaHoraria) body.carga_horaria = disciplina.cargaHoraria;
    if (disciplina.tipo) body.tipo = disciplina.tipo;
    if (disciplina.classificacao) body.classificacao = disciplina.classificacao;
    
    return this.http.patch<Disciplina>(`${this.apiUrl}/${id}`, body); 
  }

  deletarDisciplina(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}