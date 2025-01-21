import { Component,OnInit } from '@angular/core';
import { CrudNavbarComponent } from '../crud-navbar/crud-navbar.component';
import { CustomerInsertDTO } from 'src/app/shared/interface/user';
import { Router, ActivatedRoute } from '@angular/router';
import { CustomersService } from 'src/app/shared/service/customer.service';
import { FormControl, FormsModule,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer-update',
  standalone:true,
  imports: [CrudNavbarComponent,FormsModule,ReactiveFormsModule],
  templateUrl: './customer-update.component.html',
  styleUrl: './customer-update.component.css'
})
export class CustomerUpdateComponent {

  customer: CustomerInsertDTO = {
    id: 0, // Αρχικοποίηση του ID με 0 ή null αν προτιμάς
    user: {
      username: '',
      password: '',
      firstName: '',
      lastName: '',
      email: '',
      phone: '',
      address: '',
      addressNumber: '',
      city: '',
      zip: '',
      ssn: '',
      gender: 'MALE', 
      role: 'CUSTOMER', 
      isActive: true, 
    },
    discountCardNumber: '', 
  };

  constructor(
    private route: ActivatedRoute,
    private customerService: CustomersService,
    private router: Router,
  ) {}
  ngOnInit(): void {
    const id = +this.route.snapshot.params['id']; 
    this.customerService.getAllCustomers().subscribe({
      next: (data) => {
        const customer = data.content.find((c) => c.id === +id);
        if (customer) {
          this.customer = {
            id: customer.id, 
            user: {
              ...customer.user,
              password: '', 
            },
            discountCardNumber: customer.discountCardNumber, 
          };
        }
      },
      error: (err) => console.error('Error loading customer', err),
    });
  }

  onSubmit(): void {
    const id = this.customer.id; 
    this.customerService.updateCustomer(id, this.customer).subscribe({
      next: () => {
        alert('Customer updated successfully');
        this.router.navigate(['/customer/dashboard']); 
      },
      error: (err) => {
        alert('Error updating customer');
        console.error('Error updating customer', err);
        this.router.navigate(['/customer/get-all']);
      },
    });
  }

  cancel(): void {
    this.router.navigate(['/customer/get-all']);
  }

}
