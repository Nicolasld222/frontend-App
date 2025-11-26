import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="login-wrapper">
      <div class="login-card">
        <h2 class="title">Iniciar Sesión</h2>
        
        <form [formGroup]="loginForm" (ngSubmit)="onSubmit()">
          
          <div class="form-group">
            <label for="username">Usuario</label>
            <input 
              id="username" 
              type="text" 
              formControlName="username" 
              placeholder="Ingresa tu usuario"
              [class.invalid]="isInvalid('username')"
            />
          </div>

          <div class="form-group">
            <label for="password">Contraseña</label>
            <input 
              id="password" 
              type="password" 
              formControlName="password"
              placeholder="••••••••"
              [class.invalid]="isInvalid('password')"
            />
          </div>

          <div *ngIf="errorMessage" class="error-banner">
            {{ errorMessage }}
          </div>

          <button type="submit" [disabled]="loginForm.invalid || isLoading">
            {{ isLoading ? 'Ingresando...' : 'Ingresar' }}
          </button>

          <div class="footer-link">
            ¿No tienes cuenta? <a routerLink="/register">Regístrate aquí</a>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    /* Contenedor principal: Centra la tarjeta en toda la pantalla */
    .login-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh; /* Ocupa casi toda la altura */
      background-color: #f4f6f9;
    }

    /* Tarjeta del formulario */
    .login-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 400px; /* Ancho máximo */
    }

    .title {
      text-align: center;
      margin-bottom: 2rem;
      color: #333;
      font-size: 1.8rem;
    }

    .form-group {
      margin-bottom: 1.5rem;
    }

    label {
      display: block;
      margin-bottom: 0.5rem;
      color: #555;
      font-weight: 600;
      font-size: 0.95rem;
    }

    input {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 6px;
      font-size: 1rem;
      transition: border-color 0.3s;
    }

    input:focus {
      outline: none;
      border-color: #007bff;
      box-shadow: 0 0 0 3px rgba(0,123,255,0.1);
    }

    /* Estilo para input inválido */
    input.invalid {
      border-color: #dc3545;
      background-color: #fff8f8;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #007bff;
      color: white;
      border: none;
      border-radius: 6px;
      font-size: 1rem;
      font-weight: bold;
      cursor: pointer;
      transition: background-color 0.3s;
      margin-top: 1rem;
    }

    button:hover:not(:disabled) {
      background-color: #0056b3;
    }

    button:disabled {
      background-color: #a0cfff;
      cursor: not-allowed;
    }

    .error-banner {
      background-color: #ffeef0;
      color: #dc3545;
      padding: 10px;
      border-radius: 4px;
      font-size: 0.9rem;
      text-align: center;
      margin-bottom: 1rem;
      border: 1px solid #f5c6cb;
    }

    .footer-link {
      text-align: center;
      margin-top: 1.5rem;
      font-size: 0.9rem;
      color: #666;
    }

    .footer-link a {
      color: #007bff;
      text-decoration: none;
      font-weight: 600;
    }

    .footer-link a:hover {
      text-decoration: underline;
    }
  `]
})
export class LoginComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  loginForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required]
  });

  isLoading = false;
  errorMessage = '';

  onSubmit() {
    if (this.loginForm.valid) {
      this.isLoading = true;
      this.errorMessage = '';
      const req = this.loginForm.value as any;
      
      this.authService.login(req).subscribe({
        next: () => {
          this.isLoading = false;
          this.router.navigate(['/products']);
        },
        error: (err) => {
          this.isLoading = false;
          console.error(err);
          if (err.status === 401 || err.status === 403) {
            this.errorMessage = 'Usuario o contraseña incorrectos.';
          } else {
            this.errorMessage = 'Error de conexión. Intenta más tarde.';
          }
        }
      });
    } else {
      this.loginForm.markAllAsTouched();
    }
  }

  isInvalid(field: string): boolean {
    const control = this.loginForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}