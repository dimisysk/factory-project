import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ProductInsertDTO } from '../interface/product'; 

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  private baseUrl = 'http://localhost:8080/api/products';

  constructor(private http: HttpClient) {}

  createProduct(product: ProductInsertDTO): Observable<ProductInsertDTO> {
    return this.http.post<ProductInsertDTO>('http://localhost:8080/api/products/create', product);
}

getProducts(filters: any): Observable<any[]> {
  return this.http.post<any[]>('http://localhost:8080/api/products/all', filters);
}

}

