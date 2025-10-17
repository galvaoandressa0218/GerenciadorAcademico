import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component';
import { MainLayoutComponent } from './features/main-layout-component/main-layout-component.component';
import { ProfessoresComponent } from './features/professores/professores.component';
import { DisciplinasComponent } from './features/disciplinas/disciplinas.component';
import { MatrizCurricularComponent } from './features/matriz-curricular/matriz-curricular.component';
import { MateriasCadastradasComponent } from './features/materias-cadastradas/materias-cadastradas.component';
import { DetalheMateriasComponent } from './features/detalhe-materias/detalhe-materias.component';
// import { AuthGuard } from './features/core/guards/auth.guard'; // Importe o AuthGuard se estiver usando autenticação
export const routes: Routes = [
  // 1. ROTAS PÚBLICAS (Sem Sidebar)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: RecuperarSenhaComponent },

  // 2. ROTAS PROTEGIDAS (Com Sidebar - Component: MainLayoutComponent)
  {
    path: 'app',
    component: MainLayoutComponent,
    // canActivate: [AuthGuard],
    children: [
      // ROTA PADRÃO (Se acessar /app, redireciona para a tela de Matérias Cadastradas)
      {
        path: '',
        redirectTo: 'materias-cadastradas', // <-- Redireciona para a nova tela
        pathMatch: 'full',
      },

      // Página Inicial (Rotas da Sidebar)
      // Se você quiser que "Página Inicial" abra a tela de Matérias Cadastradas.
      {
        path: 'pagina-inicial',
        loadComponent: () =>
          import(
            './features/materias-cadastradas/materias-cadastradas.component'
          ).then((m) => m.MateriasCadastradasComponent),
      },

      // Professores
      {
        path: 'professores',
        loadComponent: () =>
          import('./features/professores/professores.component').then(
            (m) => m.ProfessoresComponent
          ),
      },

      // Disciplinas
      {
        path: 'disciplinas',
        loadComponent: () =>
          import('./features/disciplinas/disciplinas.component').then(
            (m) => m.DisciplinasComponent
          ),
      },

      // Matérias Cadastradas (Rota principal da tela que está sendo desenvolvida)
      {
        path: 'materias-cadastradas', 
        loadComponent: () =>
          import(
            './features/materias-cadastradas/materias-cadastradas.component'
          ).then((m) => m.MateriasCadastradasComponent),
      },

      // Matriz Curricular
      {
        path: 'matriz-curricular',
        loadComponent: () =>
          import(
            './features/matriz-curricular/matriz-curricular.component'
          ).then((m) => m.MatrizCurricularComponent),
      },

      { 
  path: 'materia/:id', // <--- Rota que aceita o ID como parâmetro
  loadComponent: () => import('./features/detalhe-materias/detalhe-materias.component').then(m => m.DetalheMateriasComponent) 
},
      
      // Rotas futuras de Cronogramas, etc., devem ser adicionadas aqui

      // Fallback para rotas protegidas não encontradas
      { path: '**', redirectTo: 'materias-cadastradas' },
    ],
  },

  // 3. Rota Coringa (Fallback Global)
  { path: '**', redirectTo: 'login' },
];
