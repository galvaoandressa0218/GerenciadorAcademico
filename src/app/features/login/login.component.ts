import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { AuthService, AuthResponse } from '../core/services/auth.service';
import { BotaoLoginComponent } from './../../shared/botao-login/botao-login.component';
import { Router, RouterLink } from '@angular/router';
import { RecuperarSenhaComponent } from '../recuperar-senha/recuperar-senha.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BotaoLoginComponent,
    RouterLink,
    RecuperarSenhaComponent
],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent { 
  username = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  // Injeção usando inject() - PRÁTICA STANDALONE RECOMENDADA
  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogin(): void {
    this.errorMessage.set(null);
    this.isLoading.set(true);

    const credentials = {
      usuario: this.username(),
      senha: this.password()
    };

    this.authService.login(credentials).subscribe({
      next: (response: AuthResponse) => {
        this.isLoading.set(false);
        this.router.navigate(['/app/matrizes']); // Redireciona para a futura área protegida
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.errorMessage.set('Usuário ou senha inválidos. Tente novamente.');
      }
    });
  }
}
