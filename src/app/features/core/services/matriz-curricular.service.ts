import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { MatrizCurricular, MatrizCurricularSummary } from '../model/matriz-curricular.model';

@Injectable({
  providedIn: 'root'
})
export class MatrizCurricularService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/matrizes-curriculares`;
  private disciplinaMatrizApiUrl = `${environment.apiUrl}/api/disciplinas-matriz`;

  public getMatrizById(id: number): Observable<MatrizCurricular> {
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/${id}/detalhes`);
  }

  public getMatrizByCursoId(cursoId: number): Observable<MatrizCurricular> {
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/curso/${cursoId}`);
  }

  public getAllMatrizes(): Observable<MatrizCurricularSummary[]> {
    return this.http.get<MatrizCurricularSummary[]>(this.apiUrl);
  }

  public addDisciplinaToMatriz(data: any): Observable<any> {
    return this.http.post(this.disciplinaMatrizApiUrl, data);
  }
}