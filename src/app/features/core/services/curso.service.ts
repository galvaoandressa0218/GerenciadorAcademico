import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Curso } from '../model/curso.model';

@Injectable({
  providedIn: 'root'
})
export class CursoService {

  // Dados de exemplo para simular o backend
  private mockCursos: Curso[] = [
    { id: 1, nome: 'Direito', turno: 'Matutino', campus: 'Pituaçu', habilitacao: 'Bacharelado', ch: 3700 },
    { id: 2, nome: 'Direito', turno: 'Matutino', campus: 'Pituaçu', habilitacao: 'Bacharelado', ch: 3700 },
    { id: 3, nome: 'Engenharia de Software', turno: 'Matutino', campus: 'Pituaçu', habilitacao: 'Bacharelado', ch: 3550 },
    { id: 4, nome: 'Engenharia de Software', turno: 'Matutino', campus: 'Pituaçu', habilitacao: 'Bacharelado', ch: 3550 },
  ];

  constructor() { }

  getCursos(): Observable<Curso[]> {
    return of(this.mockCursos);
  }

  addCurso(curso: Omit<Curso, 'id'>): Observable<Curso> {
    const novoCurso: Curso = {
      id: Date.now(), // Simula a geração de um novo ID
      ...curso
    };
    this.mockCursos.push(novoCurso);
    return of(novoCurso);
  }
}