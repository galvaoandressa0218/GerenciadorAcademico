import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
// Adicionar as importações que faltavam para o forgotPassword
import { Observable, tap, BehaviorSubject, of, delay, throwError } from 'rxjs';
import { environment } from '../../../../environment';

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
  private readonly apiUrl = `${environment.apiUrl}/auth`;

  private http = inject(HttpClient);
  private router = inject(Router);

  private userRoleSubject = new BehaviorSubject<'Admin' | 'Professor' | null>(null);
  public userRole$ = this.userRoleSubject.asObservable();

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      const storedRole = localStorage.getItem('user_role') as 'Admin' | 'Professor';
      if (storedRole) {
        this.userRoleSubject.next(storedRole);
      }
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', response.token);
          localStorage.setItem('user_role', response.role);
        }
        this.userRoleSubject.next(response.role);
      })
    );
  }

  // --- MÉTODO ADICIONADO DE VOLTA ---
  forgotPassword(email: string): Observable<void> {
    if (email.includes('@')) {
      // Simula uma chamada de API, já que não temos o endpoint no backend
      // Em uma implementação real, seria: return this.http.post<void>(`${this.apiUrl}/forgot-password`, { email });
      return of(undefined).pipe(delay(500));
    } else {
      return throwError(() => ({ status: 400, error: { message: 'Email inválido' } }));
    }
  }

  logout(): void {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem('auth_token');
      localStorage.removeItem('user_role');
    }
    this.userRoleSubject.next(null);
    this.router.navigate(['/login']);
  }

  public get isAdmin(): boolean {
    return this.userRoleSubject.value === 'Admin';
  }

  public get isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }
}