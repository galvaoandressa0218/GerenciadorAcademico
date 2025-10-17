// matriz-curricular.component.ts

import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
// Importação correta das Interfaces atualizadas
import { MatrizCurricularService, MatrizCurricular } from '../core/services/matriz-curricular.service'; 

import { BotaoOrganizarComponent } from '../../shared/botao-organizar/botao-organizar.component';


@Component({
  selector: 'app-matriz-curricular',
  standalone: true,
  imports: [
    CommonModule, 
    BotaoOrganizarComponent,
  ],
  templateUrl: './matriz-curricular.component.html',
  styleUrls: ['./matriz-curricular.component.css']
})
export class MatrizCurricularComponent implements OnInit {
  
  private matrizService = inject(MatrizCurricularService);
  
  // CORREÇÃO: Tipagem do Signal para incluir 'Opcionais' (string)
  // O índice 4 corresponde ao 5º semestre (0-indexed)
  public matriz = signal<MatrizCurricular | null>(null);
  public openSemesterIndex = signal<number | 'Opcionais' | null>(4); 

  ngOnInit(): void {
    this.matrizService.getMatrizByCourseId(1).subscribe({
      next: (data: MatrizCurricular) => this.matriz.set(data),
      error: (err: any) => console.error('Erro ao carregar matriz:', err)
    });
  }

  // CORREÇÃO: Tipagem da função para aceitar number OU 'Opcionais'
  toggleSemester(index: number | 'Opcionais'): void {
    if (this.openSemesterIndex() === index) {
      this.openSemesterIndex.set(null);
    } else {
      this.openSemesterIndex.set(index);
    }
  }

  handleOrganizarMatrizes(): void {
    console.log('Abrindo modal de organização/filtro da matriz...');
  }
}