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
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        const isCursoRoute = this.router.url.includes('/matriz-curricular/curso/');
        
        if (!id) {
          this.error.set('Nenhum ID fornecido na URL.');
          this.isLoading.set(false);
          return of(null);
        }

        this.isLoading.set(true);
        this.error.set(null);

        if (isCursoRoute) {
          return this.matrizService.getMatrizByCursoId(Number(id));
        } else {
          return this.matrizService.getMatrizById(Number(id));
        }
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.matriz.set(data);
        } else if (!this.error()) {
          this.error.set('Matriz não encontrada.');
        }
        this.isLoading.set(false);
      },
      error: (err) => {
        console.error('Falha ao carregar matriz:', err);
        this.error.set('Não foi possível carregar os detalhes da matriz curricular.');
        this.isLoading.set(false);
      }
    });
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