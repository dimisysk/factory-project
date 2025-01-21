import { Component, inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from 'src/app/shared/service/auth.service';
import { CustomersService } from 'src/app/shared/service/customer.service';
import { UserService } from 'src/app/shared/service/user.service';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-registration-form',
  imports: [
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule,
    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
    RouterLink,
  ],
  templateUrl: './registration-form.component.html',
  styleUrl: './registration-form.component.css',
})
export class RegistrationFormComponent {
  custmerService = inject(CustomersService);
  authService = inject(AuthService);
  userService = inject(UserService);
  router = inject(Router);

  registrationStatus: { success: boolean; message: string } = {
    success: false,
    message: 'Not attempted yet',
  };

  form = new FormGroup(
    {
      username: new FormControl('', [
        Validators.required,
        Validators.minLength(4),
        Validators.maxLength(20),
      ]),
      password: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      confirmPassword: new FormControl('', [
        Validators.required,
        Validators.minLength(8),
      ]),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      ssn: new FormControl('', Validators.required),
      email: new FormControl('', [Validators.required, Validators.email]),
      phone: new FormControl('', Validators.required),
      address: new FormControl('', Validators.required),
      addressNumber: new FormControl('', Validators.required),
      city: new FormControl('', Validators.required),
      zip: new FormControl('', Validators.required),
      discountCardNumber: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
    },
    this.passwordConfirmsValidator,
  );
  passwordConfirmsValidator(form: FormGroup) {
    if (form.get('password').value !== form.get('confirmPassword').value) {
      form.get('confirmPassword').setErrors({ passwordMismatch: true });
      return { passwordMismatch: true };
    }
    return {};
  }

  onSubmit(value: any) {
    const customerPayload = { ...this.form.value };
    delete customerPayload.confirmPassword;
    const formattedPayload = {
      user: {
        username: customerPayload.username,
        password: customerPayload.password,
        firstName: customerPayload.firstName,
        lastName: customerPayload.lastName,
        ssn: customerPayload.ssn,
        email: customerPayload.email,
        phone: customerPayload.phone,
        address: customerPayload.address,
        addressNumber: customerPayload.addressNumber,
        city: customerPayload.city,
        zip: customerPayload.zip,
        gender: customerPayload.gender,
      },
      discountCardNumber: customerPayload.discountCardNumber,
    };

    console.log('Formatted Payload to send:', formattedPayload);

    this.authService.createCustomer(formattedPayload).subscribe({
      next: (response) => {
        console.log('User registered successfully:', response);

        this.registrationStatus = {
          success: true,
          message: `Customer ${response.user.firstName} ${response.user.lastName} registered successfully! `,
        };
        this.router.navigate(['/home']);
      },
      error: (error) => {
        const code = error.error?.code || 'UnknownError';
        const message = error.error?.message || 'An unexpected error occurred';
        alert(error);
        console.error('Error registering customer');
        // console.error('Error registering customer:', code, message);

        this.registrationStatus = { success: false, message };
        this.router.navigate(['/home']);
      },
    });
  }

  checkDuplicateUsername() {
    const username = this.form.get('username').value;

    if (!username) return;

    this.userService.checkDuplicateUsername(username).subscribe({
      next: (response) => {
        console.log(response);
        this.form.get('username')?.setErrors(null);
      },
      error: (response) => {
        const message = response.error;
        console.log(message);
        this.form.get('username').setErrors({ duplicateUsername: true });
      },
    });
  }

  registerAnotherUser() {
    this.form.reset();
    this.registrationStatus = {
      success: false,
      message: 'Not attempted yet',
    };
  }
}
