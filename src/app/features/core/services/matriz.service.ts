import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MatrizCurricular {
  id: number;
  nomeMatriz: string;
  turno: string;
  campus: string;
  habilitacao: string;
  horasComplementares: number;
  horasObrigatorias: number;
  horasEletivas: number;
  horasTcc: number;
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class MatrizService {
  private http = inject(HttpClient);
  private apiUrl = 'http://localhost:8080/api/matrizes';

  public getMatrizById(id: number): Observable<MatrizCurricular> {
    return this.http.get<MatrizCurricular>(`${this.apiUrl}/${id}`);
  }
}