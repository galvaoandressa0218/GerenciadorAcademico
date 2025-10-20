import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface DisciplinaDetalhada {
  id: number;
  nome: string;
  codigo: string;
  cargaHoraria: number;
  tipo: string;
  classificacao: string;
}

export interface Semestre {
  semestre: number;
  disciplinas: DisciplinaDetalhada[];
}

export interface MatrizCurricular {
  id: number;
  nomeMatriz: string;
  nomeCurso: string;
  turno: string;
  campus: string;
  habilitacao: string;
  horasComplementares: number;
  semestres: Semestre[];
}

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

  public addDisciplinaToMatriz(data: any): Observable<any> {
    return this.http.post(this.disciplinaMatrizApiUrl, data);
  }
}