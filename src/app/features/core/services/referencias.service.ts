import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Referencia } from '../model/referencias.model';

@Injectable({
  providedIn: 'root' 
})
export class ReferenciaService {
  private http = inject(HttpClient);
  
  private apiUrl = 'https://sua-api.com/referencias'; 

  
  constructor() { }

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<Referencia[]>(this.apiUrl);
  }
}

