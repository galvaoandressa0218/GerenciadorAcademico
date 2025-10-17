import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';

// Use as mesmas interfaces do componente
interface Secao { id: ContentType; titulo: string; conteudo: string | string[]; }
interface Disciplina { nome: string; codigo: string; secoes: Secao[]; }
type ContentType = 'ementa' | 'objetivos' | 'conteudo' | 'metodologia' | 'avaliacao';


// Dados de mock que seu backend retornaria
const MOCK_DATA: Disciplina = {
    nome: 'Arquitetura de Software',
    codigo: 'ARQS-20002',
    secoes: [
        // ... (Dados da disciplina que você já tem)
    ],
};

@Injectable({
    providedIn: 'root'
})
export class DisciplinaService {
    private http = inject(HttpClient);
    private apiUrl = '/api/disciplinas'; // Sua URL de backend

    // Método que faria a chamada real (GET)
    getDetalhesDisciplina(id: number): Observable<Disciplina> {
        // return this.http.get<Disciplina>(`${this.apiUrl}/${id}`);

        // Por enquanto, retorna o mock para testes:
        console.log(`[Service Mock] Buscando dados da disciplina ${id}`);
        return of(MOCK_DATA);
    }
    
    // Método para salvar edições (PUT/PATCH)
    saveSecao(id: number, secaoId: ContentType, novoConteudo: any): Observable<any> {
        console.log(`[Service Mock] Salvando seção ${secaoId} da disciplina ${id}`);
        // return this.http.put(`${this.apiUrl}/${id}/secoes/${secaoId}`, { conteudo: novoConteudo });
        return of({ success: true, secaoId }).pipe(delay(500));
    }
}
