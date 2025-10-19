import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { Referencia } from '../model/referencias.model';

@Injectable({ providedIn: 'root' })
export class ReferenciaService {
  private mockReferencias: Referencia[] = [
    { id: 1, titulo: 'Código Limpo', autor: 'Robert C. Martin', tipo: 'Fisico', edicao: '1ª Edição', categoria: 'Basica', imagemUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg', local: 'São Paulo', editora: 'Alta Books', ano: 2009, isbn: '978-8576082675', url: 'https://www.amazon.com.br/dp/8576082675' }
  ];

  constructor() { }

  getReferencias(): Observable<Referencia[]> {
    return of(this.mockReferencias);
  }

  addReferencia(ref: Partial<Referencia>): Observable<Referencia> {
    const novaRef: Referencia = {
      id: Date.now(),
      ano: new Date().getFullYear(),
      imagemUrl: 'https://images-na.ssl-images-amazon.com/images/I/41jEbK-jG+L._SX374_BO1,204,203,200_.jpg', // Placeholder
      ...ref
    } as Referencia;
    this.mockReferencias.push(novaRef);
    return of(novaRef);
  }
}