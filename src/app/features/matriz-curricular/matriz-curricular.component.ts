import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrizCurricular, MatrizCurricularService } from '.././core/services/matriz-curricular.service';
import { BotaoOrganizarComponent } from '../../shared/botao-organizar/botao-organizar.component';

@Component({
  selector: 'app-matriz-curricular',
  standalone: true,
  imports: [CommonModule, BotaoOrganizarComponent],
  templateUrl: './matriz-curricular.component.html',
  styleUrls: ['./matriz-curricular.component.css']
})
export class MatrizCurricularComponent implements OnInit {
  private matrizService = inject(MatrizCurricularService);

  // Signal para armazenar os dados da matriz
  public matriz = signal<MatrizCurricular | null>(null);
  public isLoading = signal(true);
  public error = signal<string | null>(null);

  // Signal para controlar qual semestre está aberto
  public openSemesterIndex = signal<number | string | null>(null);

  ngOnInit(): void {
    const matrizId = 1; // Exemplo

    this.matrizService.getMatrizById(matrizId).subscribe({
      next: (data) => {
        this.matriz.set(data);
        this.isLoading.set(false);
        // Abre o primeiro semestre por padrão
        if (data.semestres && data.semestres.length > 0) {
          this.openSemesterIndex.set(0);
        }
      },
      error: (err) => {
        this.error.set('Falha ao carregar a matriz curricular.');
        this.isLoading.set(false);
        console.error(err);
      }
    });
  }

  toggleSemester(index: number | string): void {
    if (this.openSemesterIndex() === index) {
      this.openSemesterIndex.set(null); // Fecha se já estiver aberto
    } else {
      this.openSemesterIndex.set(index); // Abre o novo
    }
  }

  handleOrganizarMatrizes(): void {
    console.log('Ação para organizar matrizes foi chamada.');
    // Implementar lógica de modal ou navegação
  }
}