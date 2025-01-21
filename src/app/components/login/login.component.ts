import { Component,inject,Inject } from '@angular/core';
import { Router, RouterLink,RouterOutlet } from '@angular/router';
import { FormControl,FormGroup,Validators } from '@angular/forms';
import { AuthService } from 'src/app/shared/service/auth.service';
import { jwtDecode } from 'jwt-decode';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Credentials } from 'src/app/shared/interface/user';

@Component({
  selector: 'app-login',
  standalone:true,
  imports: [ReactiveFormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {
  authService = inject(AuthService);
  router = inject(Router);

  invalidLogin = false;

  form = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20),
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern('^(?=.*[A-Z])(?=.*[a-z])(?=.*\\d)(?=.*[\\W_]).{8,}$'),
    ]),
  });

  onSubmit() {
    const credentials = this.form.value as Credentials;
    if (credentials) {
      this.authService.login(credentials).subscribe({
        next: (response) => {
          const jwtToken = response.token;
          localStorage.setItem('jwtToken', jwtToken);

          const decodedToken = this.authService.decodeToken();
          if (decodedToken) {
            console.log('decoded token', decodedToken);
            this.authService.user.set({
              username: decodedToken.sub,
              role: decodedToken.role,
            });

            if (decodedToken.role === 'CUSTOMER') {
              console.log('Navigating to /customer-dashboard');
              this.router.navigate(['/customer/dashboard']).then((success) => {
                if (success) {
                  console.log('Navigation successful!');
                } else {
                  console.error('Navigation failed!');
                }
              });
            } else if (decodedToken.role === 'ADMIN') {
              this.router.navigate(['customer/get-all']);
            }
          } else {
            console.error('Failed to decode token');
          }
        },
        error: (response) => {
          console.error('Login Error', response);
          this.invalidLogin = true;
        },
      });
    }
  }

}
