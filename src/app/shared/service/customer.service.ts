import { Injectable } from '@angular/core';
import { User,PaginatedResponse,CustomerInsertDTO,CustomerReadOnlyDTO } from '../interface/user'; 
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';



@Injectable({
  providedIn: 'root'
})
export class CustomersService {
  private baseUrl = 'http://localhost:8080/api/customers';

  constructor(private http: HttpClient) {}

  getAllCustomers(): Observable<PaginatedResponse<CustomerReadOnlyDTO>> {
    return this.http.get<PaginatedResponse<CustomerReadOnlyDTO>>(`${this.baseUrl}`);
  }


  getFilteredCustomers(filters: any): Observable<CustomerReadOnlyDTO[]> {
    return this.http.post<CustomerReadOnlyDTO[]>(
      `${this.baseUrl}/all`,
      filters
    );
  }
  



  updateCustomer(id: number, customer: CustomerInsertDTO): Observable< CustomerReadOnlyDTO> {
    return this.http.put<CustomerReadOnlyDTO>(`${this.baseUrl}/${id}`, customer);
  }
  

  deleteCustomer(id: number): Observable<void> {
    return this.http.delete<void>(`${this.baseUrl}/${id}`);
  }
}

