import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl = 'http://localhost:8080/api/users';

  constructor(private httpClient: HttpClient) {} 

  checkDuplicateUsername(username: string): Observable<any> {
    return this.httpClient.get<any>(`${this.baseUrl}/check-duplicate-username/${username}`);
  }
}

