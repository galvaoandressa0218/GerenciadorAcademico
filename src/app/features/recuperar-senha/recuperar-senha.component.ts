import { Component, signal, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms'; 
import { RouterLink } from '@angular/router'; 
import { AuthService } from './../core/services/auth.service';
import { BotaoLoginComponent } from '../../shared/botao-login/botao-login.component'; 

@Component({
  selector: 'app-recuperar-senha',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule, 
    BotaoLoginComponent,
    RouterLink
  ],
  templateUrl: './recuperar-senha.component.html',
  styleUrls: ['./recuperar-senha.component.css']
})
export class RecuperarSenhaComponent {
  email = signal('');
  message = signal<string | null>(null);
  isError = signal(false);
  isLoading = signal(false);

  private authService = inject(AuthService);
  
  handleForgotPassword(): void {
    this.message.set(null);
    this.isError.set(false);
    this.isLoading.set(true);


    this.authService.forgotPassword(this.email()).subscribe({ 
      next: () => {
        this.isLoading.set(false);
        this.message.set('Link de redefinição enviado para seu e-mail!');
        this.isError.set(false);
      },
      error: (err: any) => {
        this.isLoading.set(false);
        this.isError.set(true);
        this.message.set('Erro ao enviar. Verifique o e-mail e tente novamente.');
      }
    });
  }
}
