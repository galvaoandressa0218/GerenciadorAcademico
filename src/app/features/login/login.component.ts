import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../../features/core/services/auth.service';
import { BotaoLoginComponent } from '../../shared/botao-login/botao-login.component';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    BotaoLoginComponent,
    RouterLink,
  ],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  username = signal('');
  password = signal('');
  errorMessage = signal<string | null>(null);
  isLoading = signal(false);

  private authService = inject(AuthService);
  private router = inject(Router);

  handleLogin(): void {
    if (this.isLoading()) return; // Previne múltiplos cliques

    this.errorMessage.set(null);
    this.isLoading.set(true);

    const credentials = {
      usuario: this.username(),
      senha: this.password()
    };

    this.authService.login(credentials).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.router.navigate(['/app/matriz-curricular']);
      },
      error: (err) => {
        this.isLoading.set(false);
        this.errorMessage.set('Usuário ou senha inválidos. Tente novamente.');
        console.error('Falha no login:', err);
      }
    });
  }
}