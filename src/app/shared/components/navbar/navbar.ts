import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <nav class="navbar">
      <a routerLink="/" class="brand">AdsoApp</a>
      
      <div class="menu">
        <ng-container *ngIf="!(authService.currentUser$ | async)">
          <a routerLink="/login" routerLinkActive="active">Login</a>
          <a routerLink="/register" routerLinkActive="active">Registro</a>
        </ng-container>

        <ng-container *ngIf="authService.currentUser$ | async as user">
          <a routerLink="/products" routerLinkActive="active">Productos</a>
          
          <a *ngIf="user.role === 'ADMIN'" routerLink="/admin/create-product" class="admin-link">
            Crear Producto
          </a>

          <button (click)="logout()" class="btn-logout">Salir ({{ user.sub }})</button>
        </ng-container>
      </div>
    </nav>
  `,

  styles: [`
    .navbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 1rem 2rem;
      background-color: #343a40; /* Color oscuro */
      color: white;
      box-shadow: 0 2px 4px rgba(0,0,0,0.1);
    }

    .brand {
      font-size: 1.5rem;
      font-weight: bold;
      color: white;
      text-decoration: none;
    }

    .menu {
      display: flex;
      gap: 20px;
      align-items: center;
    }

    .menu a {
      color: #adb5bd;
      text-decoration: none;
      font-weight: 500;
      transition: color 0.3s;
    }

    .menu a:hover, .menu a.active {
      color: white;
    }

    .admin-link {
      color: #ffc107 !important; /* Amarillo para resaltar */
    }

    .btn-logout {
      background: none;
      border: 1px solid #adb5bd;
      color: white;
      padding: 5px 10px;
      border-radius: 4px;
      cursor: pointer;
      font-size: 0.9rem;
    }
    .btn-logout:hover {
      background-color: rgba(255,255,255,0.1);
    }
  `]
})
export class NavbarComponent {
  authService = inject(AuthService);

  logout() {
    this.authService.logout();
  }
}