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

  getAll(): Observable<Administrador[]> {
    return this.http.get<Administrador[]>(this.apiUrl);
  }

  getById(id: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/${id}`);
  }

  create(admin: Administrador): Observable<Administrador> {
    return this.http.post<Administrador>(this.apiUrl, admin);
  }

  update(id: number, admin: Administrador): Observable<Administrador> {
    return this.http.patch<Administrador>(`${this.apiUrl}/${id}`, admin);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  getByNumeroRegistro(numero_registro: number): Observable<Administrador> {
    return this.http.get<Administrador>(`${this.apiUrl}/registro/${numero_registro}`);
  }
}