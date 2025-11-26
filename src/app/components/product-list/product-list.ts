import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from '../../services/product';
import { Product } from '../../models/product.model';
import { ProductCardComponent } from '../product-car/product-car';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [CommonModule, ProductCardComponent],
  template: `
    <div class="container">
      <h2 class="title">Catálogo de Productos</h2>
      
      <p *ngIf="products.length === 0" class="no-data">Cargando productos...</p>

      <div class="grid">
        @for (prod of products; track prod.id) {
          <app-product-card 
            [product]="prod" 
            (selected)="handleProductSelection($event)">
          </app-product-card>
        }
      </div>
    </div>
  `,
  // ESTILOS AGREGADOS
  styles: [`
    .container { padding: 20px 0; }
    .title { text-align: center; margin-bottom: 30px; color: #333; }
    
    .grid {
      display: grid;
      /* Crea columnas automáticas responsive */
      grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
      gap: 25px;
    }

    .no-data { text-align: center; font-style: italic; color: #666; }
  `]
})
export class ProductListComponent implements OnInit {
  private productService = inject(ProductService);
  products: Product[] = [];

  ngOnInit() {
    this.productService.getProducts().subscribe(data => {
      this.products = data;
    });
  }

  handleProductSelection(product: Product) {
    alert(`Seleccionaste: ${product.name} (Stock: ${product.stock})`);
  }
}