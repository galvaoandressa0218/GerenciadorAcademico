import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, of, delay } from 'rxjs';

interface LoginRequest {
  usuario: string;
  senha: string;
}

export interface AuthResponse {
  token: string;
  role: 'Admin' | 'Professor';
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly apiUrl = 'http://localhost:8080/auth';

  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly MOCK_USERS = {
    'admin_test': { token: 'token-admin', role: 'Admin' as 'Admin' },
    'professor_test': { token: 'token-professor', role: 'Professor' as 'Professor' }
  };

  private userRoleSubject = new BehaviorSubject<'Admin' | 'Professor' | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor() {
    const storedRole = localStorage.getItem('user_role') as 'Admin' | 'Professor';
    if (storedRole) {
      this.userRoleSubject.next(storedRole);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    const user = this.MOCK_USERS[credentials.usuario as keyof typeof this.MOCK_USERS];

    if (user && credentials.senha === '123456') {
      return of(user).pipe(
        delay(500),
        tap(response => {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_role', response.role);
          
          this.userRoleSubject.next(response.role);
          
          this.router.navigate(['/app/matrizes']); 
        })
      );
    } else {
      return new Observable<AuthResponse>(observer => {
        observer.error({ status: 401, error: { message: 'Credenciais inválidas' } });
      });
    }
  }

  forgotPassword(email: string): Observable<void> {
    if (email.includes('@')) {
      return of(undefined).pipe(delay(500));
    } else {
      return new Observable<void>(observer => {
        observer.error({ status: 400 });
      });
    }
  }

  logout(): void {
    localStorage.removeItem('auth_token');
    localStorage.removeItem('user_role');
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get isAdmin(): boolean {
    return this.userRoleSubject.value === 'Admin';
  }

  public get isAuthenticated(): boolean {
    return !!localStorage.getItem('auth_token');
  }
}