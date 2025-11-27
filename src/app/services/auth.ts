import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable, tap } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { LoginRequest, RegisterRequest, AuthResponse, UserDecoded } from '../models/auth.models';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private apiUrl = 'http://20.163.4.129:3005/api/auth'

  private currentUserSubject = new BehaviorSubject<UserDecoded | null>(this.getUserFromStorage());
  public currentUser$ = this.currentUserSubject.asObservable();

  public isAdmin$: Observable<boolean> = this.currentUser$.pipe(
    map((user:any) => user?.role === 'ADMIN') 
  );

  login(credentials: LoginRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/login`, credentials).pipe(
      tap(response => this.handleToken(response.token))
    );
  }

  register(data: RegisterRequest): Observable<AuthResponse> {
    return this.http.post<AuthResponse>(`${this.apiUrl}/register`, data).pipe(
      tap(response => this.handleToken(response.token))
    );
  }

  logout(): void {
    localStorage.removeItem('token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private handleToken(token: string): void {
    localStorage.setItem('token', token);
    const decoded: UserDecoded = jwtDecode(token);
    this.currentUserSubject.next(decoded);
  }

  private getUserFromStorage(): UserDecoded | null {
    const token = this.getToken();
    return token ? jwtDecode(token) : null;
  }
}