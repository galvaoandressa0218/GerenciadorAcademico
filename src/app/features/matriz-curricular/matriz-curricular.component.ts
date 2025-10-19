import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { MatrizCurricular, MatrizCurricularService } from '../core/services/matriz-curricular.service';
import { OrganizarMatrizComponent } from '../../shared/organizar-matriz/organizar-matriz.component';
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component';
import { of } from 'rxjs';

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

  public matriz = signal<MatrizCurricular | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);
  public openSemesterIndex = signal<number | string | null>(null);
  public isOrganizarModalVisible = signal(false);

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        const id = params.get('id');
        if (id) {
          this.isLoading.set(true);
          return this.matrizService.getMatrizById(Number(id));
        }
        this.isLoading.set(false);
        this.error.set('Nenhum ID de matriz fornecido na URL.');
        return of(null);
      })
    ).subscribe({
      next: (data) => {
        if (data) {
          this.matriz.set(data);
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

  toggleSemester(index: number | string): void {
    this.openSemesterIndex.update(current => (current === index ? null : index));
  }

  openOrganizarModal(): void {
    this.isOrganizarModalVisible.set(true);
  }

  closeOrganizarModal(): void {
    this.isOrganizarModalVisible.set(false);
  }

  handleSaveOrganizar(formData: any): void {
    console.log('Salvando:', formData);
    this.closeOrganizarModal();
  }
}