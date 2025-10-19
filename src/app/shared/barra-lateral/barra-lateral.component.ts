import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../features/core/services/auth.service';

interface NavItem {
  icon: string; 
  label: string;
  route: string;
  adminOnly?: boolean;
}

@Component({
  selector: 'app-barralateral',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './barra-lateral.component.html',
  styleUrls: ['./barra-lateral.component.css']
})
export class SidebarComponent {
  private authService = inject(AuthService);
  
  public isAdmin = this.authService.isAdmin;

  public navItems: NavItem[] = [
    { icon: 'home', label: 'Página inicial', route: '/app/cursos' },
    { icon: 'people', label: 'Professores', route: '/app/professores' },
    { icon: 'menu_book', label: 'Disciplinas', route: '/app/disciplinas' },
    { icon: 'calendar_today', label: 'Cronogramas', route: '/app/cronogramas' },
    { icon: 'grid_view', label: 'Matrizes Curriculares', route: '/app/matriz-curricular' },
    { icon: 'import_contacts', label: 'Referencias bibliograficas', route: '/app/referencias-bibliograficas' }
  ];

  handleLogout(): void {
    this.authService.logout();
  }
}