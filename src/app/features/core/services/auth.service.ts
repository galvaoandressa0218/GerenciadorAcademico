import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
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

  constructor() {
    const storedRole = localStorage.getItem('user_role') as 'Admin' | 'Professor';
    if (storedRole) {
      this.userRoleSubject.next(storedRole);
    }
  }

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => {
        localStorage.setItem('auth_token', response.token);
        localStorage.setItem('user_role', response.role);
        this.userRoleSubject.next(response.role);
      })
    );
  }

  forgotPassword(email: string): Observable<void> {
    if (email.includes('@')) {
      // Simula uma chamada de API, já que não temos o endpoint no backend
      return of(undefined).pipe(delay(500));
    } else {
      return throwError(() => ({ status: 400, error: { message: 'Email inválido' } }));
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