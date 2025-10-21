import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Referencia } from '../model/referencias.model';
import { environment } from '../../../../environment';

@Injectable({ providedIn: 'root' })
export class ReferenciaService {
  private http = inject(HttpClient);
  private apiUrl = `${environment.apiUrl}/referencia`;

  private mapReferenciaResponse(r: any): Referencia {
    return {
        id: r.id,
        titulo: r.titulo,
        autor: r.autor,
        tipo: r.tipo,
        edicao: r.edicao,
        categoria: r.categoria,
        local: r.local,
        editora: r.editora,
        ano: r.ano,
        isbn: r.isbn,
        url: r.url,
        programa_id: r.programa_id, 
        imagemUrl: r.imagemUrl || 'placeholder' 
    } as Referencia;
  }

  getReferencias(): Observable<Referencia[]> {
    return this.http.get<any[]>(this.apiUrl).pipe(
        map(data => data.map(this.mapReferenciaResponse))
    );
  }

  addReferencia(ref: Partial<Referencia>): Observable<Referencia> {
    const body = {
        titulo: ref.titulo,
        autor: ref.autor,
        tipo: ref.tipo,
        edicao: ref.edicao,
        categoria: ref.categoria,
        local: ref.local,
        editora: ref.editora,
        ano: ref.ano,
        isbn: ref.isbn,
        url: ref.url,
        programa_id: ref.programa_id
    };
    return this.http.post<any>(this.apiUrl, body).pipe(map(this.mapReferenciaResponse));
  }

  updateReferencia(id: number, ref: Partial<Referencia>): Observable<Referencia> {
   
    const body: any = {};
    if (ref.titulo) body.titulo = ref.titulo;
    if (ref.autor) body.autor = ref.autor;
    if (ref.tipo) body.tipo = ref.tipo;
    if (ref.edicao) body.edicao = ref.edicao;
    if (ref.categoria) body.categoria = ref.categoria;
    if (ref.local) body.local = ref.local;
    if (ref.editora) body.editora = ref.editora;
    if (ref.ano) body.ano = ref.ano;
    if (ref.isbn) body.isbn = ref.isbn;
    if (ref.url) body.url = ref.url;
    if (ref.programa_id) body.programa_id = ref.programa_id; 

    return this.http.patch<any>(`${this.apiUrl}/${id}`, body).pipe(map(this.mapReferenciaResponse));
  }

  deleteReferencia(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}