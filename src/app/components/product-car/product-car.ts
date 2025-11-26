import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Product } from '../../models/product.model';
import { StockStatusPipe } from '../../pipes/stock-status.pipe';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, StockStatusPipe],
  template: `
    <div class="card">
      <div class="card-header">
        <h3>{{ product.name }}</h3>
      </div>
      <div class="card-body">
        <p class="price">{{ product.price | currency:'USD' }}</p>
        <p class="stock">Estado: <span>{{ product.stock | stockStatus }}</span></p>
      </div>
      <div class="card-footer">
        <button (click)="onSelect()">Ver Detalles</button>
      </div>
    </div>
  `,

  styles: [`
    .card {
      background: white;
      border: 1px solid #e0e0e0;
      border-radius: 8px;
      overflow: hidden;
      box-shadow: 0 2px 5px rgba(0,0,0,0.05);
      transition: transform 0.2s, box-shadow 0.2s;
      display: flex;
      flex-direction: column;
      height: 100%;
    }

    .card:hover {
      transform: translateY(-5px);
      box-shadow: 0 5px 15px rgba(0,0,0,0.1);
    }

    .card-header {
      background-color: #f8f9fa;
      padding: 15px;
      border-bottom: 1px solid #eee;
    }
    .card-header h3 { margin: 0; font-size: 1.1rem; color: #333; }

    .card-body { padding: 15px; flex-grow: 1; }
    .price { font-size: 1.2rem; font-weight: bold; color: #28a745; margin: 10px 0; }
    .stock { font-size: 0.9rem; color: #666; }

    .card-footer { padding: 15px; background-color: white; text-align: center; }
    button {
      background-color: #007bff;
      color: white;
      border: none;
      padding: 8px 16px;
      border-radius: 4px;
      cursor: pointer;
      width: 100%;
      transition: background 0.2s;
    }
    button:hover { background-color: #0056b3; }
  `]
})
export class ProductCardComponent {
  @Input({ required: true }) product!: Product;
  @Output() selected = new EventEmitter<Product>();

  onSelect() {
    this.selected.emit(this.product);
  }
}