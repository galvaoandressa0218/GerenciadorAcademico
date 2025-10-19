import { Routes } from '@angular/router';

// Guards
import { authGuard } from './features/core/guards/auth.guard';
import { adminGuard } from './features/core/guards/admin.guard';

// Componentes
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component';
import { MainLayoutComponent } from './features/main-layout-component/main-layout-component.component';
import { CursosComponent } from './features/cursos/cursos.component';

export const routes: Routes = [
  // 1. ROTAS PÚBLICAS
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: RecuperarSenhaComponent },

  // 2. ROTAS PROTEGIDAS (DENTRO DO LAYOUT PRINCIPAL)
  {
    path: 'app',
    component: MainLayoutComponent,
    canActivate: [authGuard], // Guarda protege todo o bloco '/app'
    children: [
      { path: '', redirectTo: 'cursos', pathMatch: 'full' },

      // Todas as rotas internas estão aqui
      { path: 'cursos', component: CursosComponent },
      {
        path: 'professores',
        canActivate: [adminGuard], // Guarda protege apenas para admins
        loadComponent: () => import('./features/professores/professores.component').then(m => m.ProfessoresComponent)
      },
      {
        path: 'disciplinas',
        loadComponent: () => import('./features/disciplinas/disciplinas.component').then(m => m.DisciplinasComponent)
      },
      {
        path: 'cronogramas', 
        loadComponent: () => import('./features/materias-cadastradas/materias-cadastradas.component')
          .then(m => m.MateriasCadastradasComponent)
      },
      { 
        path: 'matriz-curricular/:id', 
        loadComponent: () => import('./features/matriz-curricular/matriz-curricular.component')
                              .then(m => m.MatrizCurricularComponent)
      },
      {
        path: 'referencias-bibliograficas',
        loadComponent: () => import('./features/referencias-bibliograficas/referencias-bibliograficas.component').then(m => m.ReferenciasBibliograficasComponent)
      },
      {
        path: 'materia/:id',
        loadComponent: () => import('./features/detalhe-materias/detalhe-materias.component').then(m => m.DetalheMateriasComponent)
      }
    ]
  },

  // 3. ROTA CORINGA GLOBAL (sempre por último)
  { path: '**', redirectTo: 'login' }
];