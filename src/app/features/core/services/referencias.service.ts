import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referencia } from '../model/referencias.model';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class ReferenciaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/api/referencias`;

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<Referencia[]>(this.apiUrl);
  }

  addReferencia(ref: Partial<Referencia>): Observable<Referencia> {
    return this.http.post<Referencia>(this.apiUrl, ref);
  }

  updateReferencia(id: number, ref: Partial<Referencia>): Observable<Referencia> {
    return this.http.put<Referencia>(`${this.apiUrl}/${id}`, ref);
  }

  deleteReferencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}