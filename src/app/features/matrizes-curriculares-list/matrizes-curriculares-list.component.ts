import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatrizCurricularService } from '../core/services/matriz-curricular.service';
import { MatrizCurricularSummary } from '../core/model/matriz-curricular.model';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-matrizes-curriculares-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './matrizes-curriculares-list.component.html',
  styleUrls: ['./matrizes-curriculares-list.component.css']
})
export class MatrizesCurricularesListComponent implements OnInit {
  private matrizService = inject(MatrizCurricularService);
  private router = inject(Router);

  public matrizes = signal<MatrizCurricularSummary[]>([]);
  public isLoading = signal(true);

  ngOnInit(): void {
    this.matrizService.getAllMatrizes().subscribe({
      next: (data: MatrizCurricularSummary[]) => {
        this.matrizes.set(data);
        this.isLoading.set(false);
      },
      error: (err: HttpErrorResponse) => {
        console.error('Falha ao carregar lista de matrizes:', err);
        this.isLoading.set(false);
      }
    });
  }

  navigateToDetail(matriz: MatrizCurricularSummary): void {
    this.router.navigate(['/app/matriz-curricular', matriz.id]);
  }
}