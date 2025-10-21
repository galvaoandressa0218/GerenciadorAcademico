import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap, of } from 'rxjs';
import { MatrizCurricularService } from '../core/services/matriz-curricular.service';
import { MatrizCurricular } from '../core/model/matriz-curricular.model';
import { OrganizarMatrizComponent } from '../../shared/organizar-matriz/organizar-matriz.component';
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component';

@Component({
  selector: 'app-matriz-curricular',
  standalone: true,
  imports: [
    CommonModule,
    OrganizarMatrizComponent,
    BarraCliqueComponent
  ],
  templateUrl: './matriz-curricular.component.html',
  styleUrls: ['./matriz-curricular.component.css']
})
export class MatrizCurricularComponent implements OnInit {
  private matrizService = inject(MatrizCurricularService);
  private route = inject(ActivatedRoute);
  private router = inject(Router);

  public matriz = signal<MatrizCurricular | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);
  public openSemesterIndex = signal<number | null>(null);
  public isOrganizarModalVisible = signal(false);

  ngOnInit(): void {
    this.loadMatriz();
  }

  private loadMatriz(): void {
    const dadoMockado: MatrizCurricular = {
      id: 1,
      nomeMatriz: 'Matriz 2025.1',
      nomeCurso: 'Engenharia de Software',
      turno: 'Noturno',
      campus: 'Federação',
      habilitacao: 'Bacharelado',
      horasComplementares: 200,
      semestres: [
        { 
          semestre: 1, 
          disciplinas: [
            { id: 101, nome: 'Lógica de Programação', codigo: 'COMP-101', cargaHoraria: 68, tipo: 'PRESENCIAL', classificacao: 'TEORICA' },
            { id: 102, nome: 'Cálculo I', codigo: 'MAT-101', cargaHoraria: 80, tipo: 'PRESENCIAL', classificacao: 'TEORICA' }
          ] 
        }
      ]
    };
    this.matriz.set(dadoMockado);
    this.isLoading.set(false);
  }

  toggleSemester(index: number): void {
    this.openSemesterIndex.update(current => (current === index ? null : index));
  }

  openOrganizarModal(): void {
    this.isOrganizarModalVisible.set(true);
  }

  closeOrganizarModal(): void {
    this.isOrganizarModalVisible.set(false);
  }

  handleSaveOrganizar(formData: any): void {
    this.matrizService.addDisciplinaToMatriz(formData).subscribe({
      next: () => {
        this.closeOrganizarModal();
        this.loadMatriz();
      },
      error: (err) => {
        console.error('Erro ao adicionar disciplina à matriz:', err);
        alert('Falha ao adicionar disciplina. Verifique o console.');
      }
    });
  }
}