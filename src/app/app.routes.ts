import { Routes } from '@angular/router';
import { LoginComponent } from './features/login/login.component';
import { RecuperarSenhaComponent } from './features/recuperar-senha/recuperar-senha.component'; // ✅ Importe o nome correto

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },

  // A ROTA: Carrega o componente de recuperação de senha
  {
    path: 'forgot-password', 
    component: RecuperarSenhaComponent // ✅ Use o nome da classe
  },

  { path: '**', redirectTo: 'login' }
];