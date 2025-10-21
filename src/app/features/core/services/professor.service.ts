import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../../../environment';
import { Professor } from '../model/professor.model';

@Injectable({
  providedIn: 'root'
})
export class ProfessorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/professor`;

  // Função de mapeamento para converter snake_case do BE para camelCase do FE
  private mapProfessorResponse(p: any): Professor {
    return {
      id: p.id,
      nomeCompleto: p.nome_completo, // Mapeamento de nome_completo
      numeroRegistro: p.numero_registro, // Mapeamento de numero_registro
      escolaVinculada: p.escola_vinculada, // Mapeamento de escola_vinculada
      ativo: p.ativo,
      dataCadastro: p.dataCadastro || new Date().toISOString(),
      programa_ids: p.programa_ids // Tratamento da nova lista de IDs de programas
    } as Professor;
  }

  getProfessores(): Observable<Professor[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(data => data.map(this.mapProfessorResponse))
    );
  }

  criarProfessor(professor: Partial<Professor>): Observable<Professor> {
    // Mapeamento dos campos do FE para o snake_case do BE
    const body = {
      nome_completo: professor.nomeCompleto,
      numero_registro: professor.numeroRegistro,
      escola_vinculada: professor.escolaVinculada,
      ativo: professor.ativo
    };
    return this.http.post<any>(this.apiUrl, body).pipe(map(this.mapProfessorResponse));
  }

  atualizarProfessor(id: number, professor: Partial<Professor>): Observable<Professor> {
    // Mapeamento dos campos do FE para o snake_case do BE
    const body: any = {};
    if (professor.nomeCompleto !== undefined) body.nome_completo = professor.nomeCompleto;
    if (professor.numeroRegistro !== undefined) body.numero_registro = professor.numeroRegistro;
    if (professor.escolaVinculada !== undefined) body.escola_vinculada = professor.escolaVinculada;
    if (professor.ativo !== undefined) body.ativo = professor.ativo;

    // O Controller do BE usa PATCH
    return this.http.patch<any>(`${this.apiUrl}/${id}`, body).pipe(map(this.mapProfessorResponse));
  }

  deletarProfessor(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}