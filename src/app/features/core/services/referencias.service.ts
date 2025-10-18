import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referencia } from '../model/referencias.model';
import { environment } from '../../../../environment';

@Injectable({
  providedIn: 'root'
})
export class ReferenciaService {
  private http = inject(HttpClient);
  // O endpoint deve corresponder ao @RequestMapping no seu controller de Referencia_bibliografica
  private apiUrl = `${environment.apiUrl}/referencias-bibliograficas`;

  constructor() { }

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<Referencia[]>(this.apiUrl);
  }
}