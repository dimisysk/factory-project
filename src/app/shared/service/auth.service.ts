import { effect, inject, Injectable, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { from, Observable } from 'rxjs';
import { User,AuthenticationResponse } from '../interface/user'; 
import { tap } from 'rxjs/operators';
import { CustomerReadOnlyDTO } from '../interface/user'; 

export interface LoggedInUser {
  username: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth';
  private custUrl = 'http://localhost:8080/api/customers';
  router: Router = inject(Router);
  http: HttpClient = inject(HttpClient);

  user = signal<LoggedInUser | null>(null);
  userId: number | null = null;

  constructor() {
    // const token = localStorage.getItem('jwtToken')
    
    // if (token) {
    //   const decodedToken = jwtDecode(token).sub as unknown as LoggedInUser
    //     this.user.set({
    //       username: decodedToken.username,
    //       role: decodedToken.role,
    //     });

        effect(() => {
          if (this.user()) {
            console.log('User logged in:', this.user().username, this.user().role);
          } else {
            console.log('No user logged in');
          }
        });
     
      }

      decodeToken(): { sub: string; role: string } | null {
        const token = localStorage.getItem("jwtToken")
        if (token) {
          try {
            const decodedToken = jwtDecode<any>(token); // Αποκωδικοποίηση του token
            return {
              sub: decodedToken.sub, // Το subject (username)
              role: decodedToken.role, // Το role από τις claims
            };
          } catch (error) {
            console.error('Invalid token format:', error);
            return null;
          }
        }
        return null;
      }
      
    


      createCustomer(customer: any): Observable<any> {
        return this.http.post<any>('http://localhost:8080/api/customers/create', customer);
      }
      saveToken(token: string): void {
        localStorage.setItem('jwtToken', token);
      }
      
      
      login(credentials: { username: string; password: string }): Observable<AuthenticationResponse> {
        const decodedToken = this.decodeToken()
        return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, credentials).pipe(
          tap((response) => {
            this.saveToken(response.token);
            this.user.set({
              username: credentials.username,
              role: decodedToken.role || 'CUSTOMER',
            });
            this.userId = response.id; // Αποθηκεύουμε το ID
          })
        );
      }

  // login(credentials: { username: string; password: string }) {
  //   return this.http.post<{ token: string }>(
  //     `${this.baseUrl}/authenticate`,
  //     credentials
  //   );
  // }




  logout(): void {
    localStorage.removeItem('jwtToken');
    this.user.set(null);
    this.router.navigate(['home']);
    this.userId = null; // Καθαρίζουμε το ID
    this.router.navigate(['login']);
  }
  getUserId(): number | null {
    // Επιστρέφει το ID του χρήστη που είναι αποθηκευμένο στη μνήμη
    return this.userId;
  }

  setUserId(id: number): void {
    this.userId = id;
  }



  updateCustomer(customer: any): Observable<any> {
    return this.http.put<any>(`${this.custUrl}/${customer.id}`, customer);
  }
  getCustomerById(id: number): Observable<CustomerReadOnlyDTO> {
    return this.http.get<CustomerReadOnlyDTO>(`${this.custUrl}/${id}`);
  }

  }


   

