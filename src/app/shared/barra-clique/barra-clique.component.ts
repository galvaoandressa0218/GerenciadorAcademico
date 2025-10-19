import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-barra-clique',
  templateUrl: './barra-clique.component.html',
  styleUrls: ['./barra-clique.component.css'],
  standalone: true,
  imports: [CommonModule]
})
export class BarraCliqueComponent {
  @Input() materia?: any;
  @Input() referencia?: any;
  
  @Input() title?: string; 
  @Input() showArrow?: boolean = false; 

  @Input() estaAberta?: boolean = false;
  @Output() barClicked = new EventEmitter<void>();

  onBarClick(): void {
    this.barClicked.emit();
  }
}