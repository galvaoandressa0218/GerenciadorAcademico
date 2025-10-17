import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common'; 

@Component({
  selector: 'app-barra-clique',
  templateUrl: './barra-clique.component.html',
  styleUrls: ['./barra-clique.component.css'],
  standalone: true
})
export class BarraCliqueComponent {

  @Input() materia?: { id?: number, nome?: string, curso?: string, cargaHoraria?: number, tipo?: string, classificacao?: string };
  @Output() barClicked = new EventEmitter<void>();
  @Input() referencia?: { id?: number, tituloLivro?: string, autor?: string, tipo?: string, edicao?: string, categoria?: string, imagemUrl?: string, ano?:number, isbn?:string, link?:string };
  @Input() estaAberta?: boolean=false;
  router: any;



    onBarClick(): void {
    this.barClicked.emit();
  }
}
