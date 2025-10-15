import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { SidebarComponent } from '../../shared/barra-lateral/barra-lateral.component';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    SidebarComponent // Importa a barra lateral
  ],
  templateUrl: './main-layout-component.component.html',
  styleUrls: ['./main-layout-component.component.css']
})
export class MainLayoutComponent {}
