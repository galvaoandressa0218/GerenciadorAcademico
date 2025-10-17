import { Routes } from '@angular/router';

// ROTAS PÚBLICAS
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component';

// LAYOUT PRINCIPAL (ROTAS PROTEGIDAS)
import { MainLayoutComponent } from './features/main-layout-component/main-layout-component.component';

export const routes: Routes = [

  // 1. ROTAS PÚBLICAS (Sem Sidebar)
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'forgot-password', component: RecuperarSenhaComponent },

  // 2. ROTAS PROTEGIDAS (Com Sidebar)
  {
    path: 'app',
    component: MainLayoutComponent,
    children: [
      // Rota padrão redireciona para matérias cadastradas
      { path: '', redirectTo: 'materias-cadastradas', pathMatch: 'full' },

      // Rota para Matérias Cadastradas (antiga pagina-inicial)
      { 
        path: 'materias-cadastradas', 
        loadComponent: () => import('./features/materias-cadastradas/materias-cadastradas.component')
                              .then(m => m.MateriasCadastradasComponent)
      },

      // Professores
      { 
        path: 'professores', 
        loadComponent: () => import('./features/professores/professores.component')
                              .then(m => m.ProfessoresComponent)
      },

      // Disciplinas
      { 
        path: 'disciplinas', 
        loadComponent: () => import('./features/disciplinas/disciplinas.component')
                              .then(m => m.DisciplinasComponent)
      },

      // Matriz Curricular
      { 
        path: 'matriz-curricular', 
        loadComponent: () => import('./features/matriz-curricular/matriz-curricular.component')
                              .then(m => m.MatrizCurricularComponent)
      },
      
      // ✅ CORREÇÃO: Rota movida para dentro dos children
      {
        path: 'referencias-bibliograficas',
        loadComponent: () => import('./features/referencias-bibliograficas/referencias-bibliograficas.component')
                              .then(m => m.ReferenciasBibliograficasComponent)
      },

      // Detalhes da Matéria
     { 
        path: 'materia/:id', 
        loadComponent: () => import('./features/detalhe-materias/detalhe-materias.component')
                              .then(m => m.DetalheMateriasComponent)
      },
      
      // Fallback para rotas protegidas não encontradas
      { path: '**', redirectTo: 'materias-cadastradas' }
    ]
  },

  // 3. Rota Coringa Global (Fallback para tudo que não for encontrado)
  { path: '**', redirectTo: 'login' }
];
