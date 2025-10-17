import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BarraCliqueComponent } from '../../shared/barra-clique/barra-clique.component';
import { Referencia } from '../core/model/referencias.model';
import { ReferenciaService } from '../core/services/referencias.service'

@Component({
  selector: 'app-referencias-bibliograficas',
  standalone: true,
  imports: [CommonModule, BarraCliqueComponent],
  templateUrl: './referencias-bibliograficas.component.html',
  styleUrls: ['./referencias-bibliograficas.component.css']
})
export class ReferenciasBibliograficasComponent implements OnInit {
  
  private referenciaService = inject(ReferenciaService);

  referencias: Referencia[] = [];
  referenciaAbertaId: number | null = null;
  
  ngOnInit(): void {
    this.carregarReferencias();
  }

  carregarReferencias(): void {
    this.referenciaService.getReferencias().subscribe({
      next: (data: Referencia[]) => {
        this.referencias = data;
        if (this.referencias.length > 0) {
          this.referenciaAbertaId = this.referencias[0].id;
        }
      },
      error: (err: any) => {
        console.error('Erro ao buscar referências:', err);
      }
    });
  }

  toggleReferencia(id: number): void {
    if (this.referenciaAbertaId === id) {
      this.referenciaAbertaId = null;
    } else {
      this.referenciaAbertaId = id;
    }
  }

  adicionarReferencia(): void {
    console.log('Lógica para adicionar nova referência...');
  }
}
