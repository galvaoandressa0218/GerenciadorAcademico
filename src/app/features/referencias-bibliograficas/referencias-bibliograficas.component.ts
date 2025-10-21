import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarReferenciaComponent } from '../../shared/pop-up-adicionar-referencias/pop-up-adicionar-referencias.component';
import { Referencia } from '../core/model/referencias.model';
import { ReferenciaService } from '../core/services/referencias.service';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-referencias-bibliograficas',
  standalone: true,
  imports: [CommonModule, BotaoAdicionarComponent, PopUpAdicionarReferenciaComponent],
  templateUrl: './referencias-bibliograficas.component.html',
  styleUrls: ['./referencias-bibliograficas.component.css']
})
export class ReferenciasBibliograficasComponent implements OnInit {
  private referenciaService = inject(ReferenciaService);
  private authService = inject(AuthService);

  public referencias = signal<Referencia[]>([]);
  public expandedReferenciaId = signal<number | null>(null);
  public isModalVisible = signal(false);
  public selectedReferencia = signal<Referencia | null>(null);
  public isProfessor = this.authService.isProfessor;

  ngOnInit(): void {
    this.loadReferencias();
  }

  loadReferencias(): void {
    const dadoMockado: Referencia = {
      id: 1,
      titulo: 'Engenharia de Software Moderna',
      autor: 'Marco Tulio Valente',
      tipo: 'FISICO',
      edicao: '1ª',
      categoria: 'BASICA',
      imagemUrl: '',
      local: 'Belo Horizonte',
      editora: 'Independente',
      ano: 2020,
      isbn: '978-85-913054-1-8'
    };
    this.referencias.set([dadoMockado]);
  }

  toggleExpand(id: number): void {
    this.expandedReferenciaId.update(current => (current === id ? null : id));
  }

  openAddModal(): void {
    this.selectedReferencia.set(null);
    this.isModalVisible.set(true);
  }
  
  closeAddModal(): void {
    this.isModalVisible.set(false);
  }

  handleEdit(referencia: Referencia): void {
    this.selectedReferencia.set(referencia);
    this.isModalVisible.set(true);
  }

  handleSaveReferencia(data: Partial<Referencia>): void {
    const operation = data.id
      ? this.referenciaService.updateReferencia(data.id, data)
      : this.referenciaService.addReferencia(data);

    operation.subscribe({
      next: () => {
        this.closeAddModal();
        this.loadReferencias();
      },
      error: (err) => console.error('Erro ao salvar referência', err)
    });
  }

  handleDelete(id: number): void {
    if (confirm('Tem certeza que deseja excluir esta referência?')) {
      this.referenciaService.deleteReferencia(id).subscribe({
        next: () => {
          this.referencias.update(r => r.filter(ref => ref.id !== id));
        },
        error: err => console.error('Erro ao excluir referência', err)
      });
    }
  }
}