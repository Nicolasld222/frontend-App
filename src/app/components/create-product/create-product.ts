import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';

@Component({
  selector: 'app-create-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  template: `
    <div class="container">
      <h2>Crear Nuevo Producto</h2>
      
      <form [formGroup]="productForm" (ngSubmit)="onSubmit()">
        
        <div class="form-group">
          <label for="name">Nombre del Producto</label>
          <input 
            id="name" 
            type="text" 
            formControlName="name" 
            [class.invalid]="isInvalid('name')"
          />
          <div *ngIf="isInvalid('name')" class="error-msg">
            El nombre es requerido.
          </div>
        </div>

        <div class="form-group">
          <label for="price">Precio</label>
          <input 
            id="price" 
            type="number" 
            formControlName="price"
            [class.invalid]="isInvalid('price')"
          />
          <div *ngIf="isInvalid('price')" class="error-msg">
            El precio es requerido y debe ser mayor a 0.
          </div>
        </div>

        <div class="form-group">
          <label for="stock">Stock Inicial</label>
          <input 
            id="stock" 
            type="number" 
            formControlName="stock"
            [class.invalid]="isInvalid('stock')"
          />
          <div *ngIf="isInvalid('stock')" class="error-msg">
            El stock es requerido y no puede ser negativo.
          </div>
        </div>

        <div class="actions">
          <button type="button" routerLink="/products" class="btn-cancel">Cancelar</button>
          <button type="submit" [disabled]="productForm.invalid" class="btn-save">Guardar Producto</button>
        </div>

      </form>
    </div>
  `,
  styles: [`
    .container { max-width: 500px; margin: 2rem auto; padding: 20px; border: 1px solid #ccc; border-radius: 8px; box-shadow: 0 2px 5px rgba(0,0,0,0.1); }
    h2 { text-align: center; margin-bottom: 1.5rem; color: #333; }
    .form-group { margin-bottom: 1rem; }
    label { display: block; margin-bottom: 5px; font-weight: bold; }
    input { width: 100%; padding: 10px; border: 1px solid #ddd; border-radius: 4px; box-sizing: border-box; }
    input.invalid { border-color: #dc3545; background-color: #fff8f8; }
    .error-msg { color: #dc3545; font-size: 0.85rem; margin-top: 4px; }
    
    .actions { display: flex; gap: 10px; margin-top: 20px; }
    button { flex: 1; padding: 10px; border: none; border-radius: 4px; cursor: pointer; font-weight: bold; }
    .btn-save { background-color: #28a745; color: white; }
    .btn-save:disabled { background-color: #94d3a2; cursor: not-allowed; }
    .btn-cancel { background-color: #6c757d; color: white; }
    .btn-cancel:hover { background-color: #5a6268; }
  `]
})
export class CreateProductComponent {
  private fb = inject(FormBuilder);
  private productService = inject(ProductService);
  private router = inject(Router);

  productForm: FormGroup = this.fb.group({
    name: ['', [Validators.required]],
    price: [0, [Validators.required, Validators.min(0.01)]], 
    stock: [0, [Validators.required, Validators.min(0)]]
  });

  onSubmit() {
    if (this.productForm.valid) {
      const newProduct: Product = this.productForm.value;

      this.productService.createProduct(newProduct).subscribe({
        next: (createdProduct) => {
          alert(`Producto "${createdProduct.name}" creado con éxito.`);
          this.router.navigate(['/products']);
        },
        error: (err) => {
          console.error('Error al crear producto:', err);
          if (err.status === 403) {
            alert('No tienes permisos de administrador para realizar esta acción.');
          } else {
            alert('Ocurrió un error al guardar el producto.');
          }
        }
      });
    } else {
      this.productForm.markAllAsTouched();
    }
  }


  isInvalid(field: string): boolean {
    const control = this.productForm.get(field);
    return !!control && control.invalid && control.touched;
  }
}