import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth';
import { RegisterRequest } from '../../models/auth.models';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="register-container">
      <h2>Registro de Usuario</h2>
      
      <form [formGroup]="registerForm" (ngSubmit)="onSubmit()">
        
        <div class="form-group">
          <label for="username">Nombre de Usuario</label>
          <input 
            id="username" 
            type="text" 
            formControlName="username" 
            [class.invalid]="isInvalid('username')"
          />
          <div *ngIf="isInvalid('username')" class="error-msg">
            El usuario es requerido.
          </div>
        </div>

        <div class="form-group">
          <label for="password">Contraseña</label>
          <input 
            id="password" 
            type="password" 
            formControlName="password"
            [class.invalid]="isInvalid('password')"
          />
          <div *ngIf="isInvalid('password')" class="error-msg">
            La contraseña es requerida (mínimo 4 caracteres).
          </div>
        </div>

        <button type="submit" [disabled]="registerForm.invalid">
          Registrarse
        </button>

        <p>
          ¿Ya tienes cuenta? <a routerLink="/login">Inicia Sesión aquí</a>
        </p>

      </form>
    </div>
  `,
  styles: [`
    /* Contenedor principal: Centra la tarjeta */
    .register-wrapper {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 80vh;
      background-color: #f4f6f9;
    }

    /* Tarjeta del formulario */
    .register-card {
      background: white;
      padding: 2.5rem;
      border-radius: 12px;
      box-shadow: 0 4px 20px rgba(0,0,0,0.08);
      width: 100%;
      max-width: 400px;
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
      border-color: #28a745; /* Verde para registro */
      box-shadow: 0 0 0 3px rgba(40, 167, 69, 0.1);
    }

    input.invalid {
      border-color: #dc3545;
      background-color: #fff8f8;
    }

    .error-text {
      color: #dc3545;
      font-size: 0.85rem;
      margin-top: 5px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #28a745; /* Verde para diferenciar del Login azul */
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
      background-color: #218838;
    }

    button:disabled {
      background-color: #c3e6cb;
      cursor: not-allowed;
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
export class RegisterComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);

  registerForm: FormGroup = this.fb.group({
    username: ['', [Validators.required]],
    password: ['', [Validators.required, Validators.minLength(4)]]
  });

  onSubmit() {
    if (this.registerForm.valid) {
      const request: RegisterRequest = this.registerForm.value;

      this.authService.register(request).subscribe({
        next: () => {
          alert('¡Registro exitoso! Bienvenido.');
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error(err);
          alert('Error en el registro. Es posible que el usuario ya exista.');
        }
      });
    } else {
      this.registerForm.markAllAsTouched();
    }
  }


  isInvalid(fieldName: string): boolean {
    const field = this.registerForm.get(fieldName);
    return !!field && field.invalid && field.touched;
  }
}