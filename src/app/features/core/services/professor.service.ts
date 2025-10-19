// Versão CORRETA
import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';
import { Professor } from '../model/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/professores`;

  getProfessores(): Observable<Professor[]> {
    return this.http.get<Professor[]>(this.apiUrl);
  }

  // Verifique se o seu método está EXATAMENTE assim
  criarProfessor(professor: Partial<Professor>): Observable<Professor> {
    return this.http.post<Professor>(this.apiUrl, professor);
  }
}