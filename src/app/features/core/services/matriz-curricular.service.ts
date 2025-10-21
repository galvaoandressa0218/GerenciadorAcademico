import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';
import { MatrizCurricular, MatrizCurricularSummary } from '../model/matriz-curricular.model';

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/matriz_curricular`;
  private disciplinaMatrizApiUrl = `${environment.apiUrl}/matriz_disciplina`; 

  private mapMatrizDetalhadaResponse(m: any): MatrizCurricular {
    return {
      id: m.id,
      nomeMatriz: m.nome_matriz,
      nomeCurso: m.nomeCurso,
      turno: m.turno,
      campus: m.campus,
      habilitacao: m.habilitacao,
      horasComplementares: m.horas_complementares, 
      semestres: m.semestres || [] 
    } as MatrizCurricular;
  }
  
  // Função de mapeamento para Matriz Curricular Resumo
  private mapMatrizSummaryResponse(m: any): MatrizCurricularSummary {
    return {
      id: m.id,
      nomeMatriz: m.nome_matriz, 
      habilitacao: m.habilitacao,
      campus: m.campus,
      turno: m.turno,
    } as MatrizCurricularSummary;
  }

  public getMatrizById(id: number): Observable<MatrizCurricular> {
    return this.http.get<any>(`${this.apiUrl}/${id}`).pipe(
      map(this.mapMatrizDetalhadaResponse)
    );
  }

  public getMatrizByCursoId(cursoId: number): Observable<MatrizCurricular> {
    return this.http.get<any>(`${this.apiUrl}/curso/${cursoId}`).pipe(
      map(this.mapMatrizDetalhadaResponse)
    );
  }

  public getAllMatrizes(): Observable<MatrizCurricularSummary[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(this.mapMatrizSummaryResponse))
    );
  }

  public addDisciplinaToMatriz(data: any): Observable<any> {
    return this.http.post(this.disciplinaMatrizApiUrl, data);
  }
}