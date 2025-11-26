import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, NavbarComponent], 
  template: `
    <app-navbar></app-navbar>

    <main class="main-layout">
      <router-outlet></router-outlet>
    </main>
  `,
  styles: [`
    /* Estilos globales básicos para centrar el contenido */
    .main-layout {
      max-width: 1200px;
      margin: 0 auto;
      padding: 20px;
      font-family: Arial, sans-serif;
    }
  `]
})
export class AppComponent {
  title = 'adso-app';
}