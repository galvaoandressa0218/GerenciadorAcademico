import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

// Interface principal da referência bibliográfica
export interface ReferenciaBibliografica {
  id?: number;
  titulo: string;
  autor: string;
  ano: string;
  categoria: string; // Ex: 'Básica' ou 'Complementar'
  ativo: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/referencias`;

  /**
   * Retorna todas as referências bibliográficas
   */
  getAll(): Observable<ReferenciaBibliografica[]> {
    return this.http.get<ReferenciaBibliografica[]>(this.apiUrl);
  }

  /**
   * Retorna uma referência específica
   */
  getById(id: number): Observable<ReferenciaBibliografica> {
    return this.http.get<ReferenciaBibliografica>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria uma nova referência bibliográfica
   */
  create(ref: ReferenciaBibliografica): Observable<ReferenciaBibliografica> {
    return this.http.post<ReferenciaBibliografica>(this.apiUrl, ref);
  }

  /**
   * Atualiza uma referência bibliográfica existente
   */
  update(id: number, ref: ReferenciaBibliografica): Observable<ReferenciaBibliografica> {
    return this.http.put<ReferenciaBibliografica>(`${this.apiUrl}/${id}`, ref);
  }

  /**
   * Exclui uma referência bibliográfica
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Retorna apenas as referências ativas
   */
  getAtivas(): Observable<ReferenciaBibliografica[]> {
    return this.http.get<ReferenciaBibliografica[]>(`${this.apiUrl}?ativo=true`);
  }
}
