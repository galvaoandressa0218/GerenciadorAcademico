import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../environment';

export interface Administrador {
  id?: number;
  nome_completo: string;
  numero_registro: number;
}

@Injectable({
  providedIn: 'root'
})
export class AdministradorService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/administradores`;

  /**
   * Retorna todos os administradores cadastrados
   */
  getAll(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.apiUrl);
  }

  /**
   * Retorna um administrador específico
   */
  getById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
  }

  /**
   * Cria um novo administrador
   */
  create(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.apiUrl, admin);
  }

  /**
   * Atualiza um administrador existente
   */
  update(id: number, admin: Administrador): Observable<Administrador> {
    return this.http.put<Administrador>(`${this.apiUrl}/${id}`, admin);
  }

  /**
   * Exclui um administrador
   */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  /**
   * Busca um administrador pelo número de registro (útil para login)
   */
  getByNumeroRegistro(numero_registro: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/registro/${numero_registro}`);
  }
}
