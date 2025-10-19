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

  public getMatrizById(id: number): Observable<MatrizCurricular> {
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/${id}/detalhes`);
  }
}