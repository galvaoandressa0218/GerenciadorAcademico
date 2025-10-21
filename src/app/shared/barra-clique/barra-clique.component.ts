import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-barra-clique',
  standalone: true,
  templateUrl: './barra-clique.component.html',
  styleUrls: ['./barra-clique.component.css']
})
export class BarraCliqueComponent {
  @Input() title: string = '';
  @Input() subtitle?: string;
  @Input() showArrow: boolean = true;
  @Input() estaAberta: boolean = false;
  @Output() barClicked = new EventEmitter<void>();

  handleClick(): void {
    this.estaAberta = !this.estaAberta; // alterna estado visual
    this.barClicked.emit(); // informa ao pai
  }
}
