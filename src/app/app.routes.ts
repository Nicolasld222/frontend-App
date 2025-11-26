import { Routes } from '@angular/router';

import { LoginComponent } from './components/login/login';
import { ProductListComponent } from './components/product-list/product-list';
import { RegisterComponent } from './components/register/register'; 
import { CreateProductComponent } from './components/create-product/create-product'; 


import { authGuard, adminGuard } from './guards/auth.guard';

export const routes: Routes = [

  { 
    path: 'login', 
    component: LoginComponent,
    title: 'Iniciar Sesión' 
  },
  { 
    path: 'register', 
    component: RegisterComponent,
    title: 'Registro de Usuario'
  },

  { 
    path: 'products', 
    component: ProductListComponent,
    canActivate: [authGuard], 
    title: 'Catálogo de Productos'
  },

  { 
    path: 'admin/create-product', 
    component: CreateProductComponent,
    canActivate: [authGuard, adminGuard], 
    title: 'Nuevo Producto'
  },

  { 
    path: '', 
    redirectTo: '/products', 
    pathMatch: 'full' 
  },
  { 
    path: '**',
    redirectTo: '/products' 
  }
];