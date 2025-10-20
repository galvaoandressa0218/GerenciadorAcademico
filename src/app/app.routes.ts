import { Routes } from '@angular/router';
//import { authGuard } from './features/core/guards/auth.guard';
//import { adminGuard } from './features/core/guards/admin.guard';
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component';
import { MainLayoutComponent } from './features/main-layout-component/main-layout-component.component';
import { CursosComponent } from './features/cursos/cursos.component';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: RecuperarSenhaComponent },
  {
    path: 'app',
    component: MainLayoutComponent,
  //  canActivate: [authGuard],
    children: [
      { path: '', redirectTo: 'cursos', pathMatch: 'full' },
      { path: 'cursos', component: CursosComponent },
      {
        path: 'professores',
       // canActivate: [adminGuard],
        loadComponent: () => import('./features/professores/professores.component').then(m => m.ProfessoresComponent)
      },
      {
        path: 'disciplinas',
        loadComponent: () => import('./features/disciplinas/disciplinas.component').then(m => m.DisciplinasComponent)
      },
      {
        path: 'cronogramas',
        loadComponent: () => import('./features/materias-cadastradas/materias-cadastradas.component').then(m => m.MateriasCadastradasComponent)
      },
      {
        // NOVA ROTA PARA A LISTAGEM
        path: 'matrizes-curriculares', 
        loadComponent: () => import('./features/matrizes-curriculares-list/matrizes-curriculares-list.component')
                              .then(m => m.MatrizesCurricularesListComponent)
      },
      { 
        // A rota de detalhes agora é acessada a partir da lista
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
      },
    ]
  },
  { path: '**', redirectTo: 'login' }
];