import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  // Inyección de dependencias moderna (Angular 14+)
  private http = inject(HttpClient);

  // URL basada en tu 'application.properties' (puerto 3005) y 'ProductController' (/api/products)
  private apiUrl = 'http://20.163.4.129:3000/api/products';

  /**
   * Obtener todos los productos
   * Endpoint: GET http://localhost:3005/api/products
   */
  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(this.apiUrl);
  }

  /**
   * Obtener un producto por ID
   * Endpoint: GET http://20.163.4.129:3000/api/products/{id}
   * (Requiere el ajuste en tu Backend mencionado en la respuesta anterior)
   */
  getProductById(id: number): Observable<Product> {
    return this.http.get<Product>(`${this.apiUrl}/${id}`);
  }

  /**
   * Crear un nuevo producto (Solo ADMIN)
   * Endpoint: POST http://20.163.4.129:3000/api/products
   */
  createProduct(product: Product): Observable<Product> {
    return this.http.post<Product>(this.apiUrl, product);
  }
}