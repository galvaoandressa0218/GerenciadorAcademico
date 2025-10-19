import { Component, OnInit, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BotaoAdicionarComponent } from '../../shared/botao-adicionar/botao-adicionar.component';
import { PopUpAdicionarReferenciaComponent } from '../../shared/pop-up-adicionar-referencias/pop-up-adicionar-referencias.component';
import { Referencia } from '../core/model/referencias.model';
import { ReferenciaService } from '../core/services/referencias.service';

@Component({
  selector: 'app-referencias-bibliograficas',
  standalone: true,
  imports: [CommonModule, BotaoAdicionarComponent, PopUpAdicionarReferenciaComponent],
  templateUrl: './referencias-bibliograficas.component.html',
  styleUrls: ['./referencias-bibliograficas.component.css']
})
export class ReferenciasBibliograficasComponent implements OnInit {
  private referenciaService = inject(ReferenciaService);

  public referencias = signal<Referencia[]>([]);
  public expandedReferenciaId = signal<number | null>(null);
  public isModalVisible = signal(false);
  
  ngOnInit(): void {
    this.referenciaService.getReferencias().subscribe(data => this.referencias.set(data));
  }

  toggleExpand(id: number): void {
    this.expandedReferenciaId.update(current => (current === id ? null : id));
  }

  openAddModal(): void { this.isModalVisible.set(true); }
  closeAddModal(): void { this.isModalVisible.set(false); }
  
  handleSaveReferencia(data: Partial<Referencia>): void {
    this.referenciaService.addReferencia(data).subscribe(novaRef => {
      this.referencias.update(lista => [...lista, novaRef]);
      this.closeAddModal();
    });
  }
}