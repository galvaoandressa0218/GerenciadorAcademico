import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component';
import { MainLayoutComponent } from './features/main-layout-component/main-layout-component.component';
import { ProfessoresComponent } from './features/professores/professores.component';
import { DisciplinasComponent } from './features/disciplinas/disciplinas.component';

export const routes: Routes = [

  // 1. ROTAS PÚBLICAS (Sem Sidebar)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: RecuperarSenhaComponent },

  // 2. ROTAS PROTEGIDAS (Com Sidebar - Component: MainLayoutComponent)
  {
    path: 'app',
    component: MainLayoutComponent, 
    // canActivate: [AuthGuard], // Futuro: Implementar guarda de autenticação
    children: [

      { path: 'professores', loadComponent: () => import('./features/professores/professores.component').then(m => m.ProfessoresComponent) },

      // Rotas filhas (Lazy Loading) baseadas na sua Sidebar
      // { 
        // path: 'dashboard', 
        // loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) 
      // },
      // { 
      // },
       { 
            path: 'disciplinas', 
            loadComponent: () => import('./features/disciplinas/disciplinas.component').then(m => m.DisciplinasComponent) 
          },
      // { 
        // path: 'cronogramas', 
        // loadComponent: () => import('./features/schedules/schedules.component').then(m => m.SchedulesComponent) 
      // },
      // { 
        // path: 'matrizes', 
        // loadComponent: () => import('./features/matriz-list/matriz-list.component').then(m => m.MatrizListComponent) 
      // },
    ] // O array children deve ser fechado corretamente
  }, // Vírgula para fechar a rota 'app'

  // 3. Rota Coringa (Fallback)
  { path: '**', redirectTo: 'login' }
];
