import { Injectable, inject, PLATFORM_ID, Inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, tap, BehaviorSubject, of, throwError, catchError } from 'rxjs';
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
  private readonly apiUrl = `${environment.apiUrl}/api/auth`;

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
    const basicAuthHeader = 'Basic ' + btoa(credentials.usuario + ':' + credentials.senha);
    const headers = new HttpHeaders({ Authorization: basicAuthHeader });

    return this.http.get<AuthResponse>(`${this.apiUrl}/validate`, { headers }).pipe(
      tap(response => {
        if (isPlatformBrowser(this.platformId)) {
          localStorage.setItem('auth_token', basicAuthHeader);
          localStorage.setItem('user_role', response.role);
        }
        this.userRoleSubject.next(response.role);
      }),
      catchError(error => {
        console.error("Login failed in AuthService", error);
        return throwError(() => new Error('Usuário ou senha inválidos'));
      })
    );
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

  public get isProfessor(): boolean {
    return this.userRoleSubject.value === 'Professor';
  }

  public get isAuthenticated(): boolean {
    if (isPlatformBrowser(this.platformId)) {
      return !!localStorage.getItem('auth_token');
    }
    return false;
  }
  
  forgotPassword(email: string): Observable<void> {
    if (email && email.includes('@')) {
      return of(undefined);
    } else {
      return throwError(() => new Error('Email inválido'));
    }
  }
}