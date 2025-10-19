import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatrizCurricular, MatrizCurricularService } from '../core/services/matriz-curricular.service';
import { OrganizarMatrizComponent } from '../../shared/organizar-matriz/organizar-matriz.component';
// Importar a barra-clique que vamos usar no template
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component';

@Component({
  selector: 'app-matriz-curricular',
  standalone: true,
  imports: [
    CommonModule, 
    OrganizarMatrizComponent,
    BarraCliqueComponent // Adicionado aqui
  ],
  templateUrl: './matriz-curricular.component.html',
  styleUrls: ['./matriz-curricular.component.css']
})
export class MatrizCurricularComponent implements OnInit {
  // ... (código existente sem alterações)
  private matrizService = inject(MatrizCurricularService);
  public matriz = signal<MatrizCurricular | null>(null);
  public isLoading = signal(true);
  public openSemesterIndex = signal<number | string | null>(null);
  public isOrganizarModalVisible = signal(false);

  ngOnInit(): void {
    const matrizId = 1;
    this.matrizService.getMatrizById(matrizId).subscribe({
      next: (data: MatrizCurricular) => {
        this.matriz.set(data);
        this.isLoading.set(false);
      },
      error: (err: any) => {
        console.error('Falha ao carregar matriz:', err);
        this.isLoading.set(false);
      }
    });
  }

  toggleSemester(index: number | string): void {
    this.openSemesterIndex.update(current => (current === index ? null : index));
  }

  openOrganizarModal(): void { this.isOrganizarModalVisible.set(true); }
  closeOrganizarModal(): void { this.isOrganizarModalVisible.set(false); }
  handleSaveOrganizar(formData: any): void {
    console.log('Salvando:', formData);
    this.closeOrganizarModal();
  }
}