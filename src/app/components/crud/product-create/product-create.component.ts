import { Component } from '@angular/core';
import { CrudNavbarComponent } from '../crud-navbar/crud-navbar.component';
import { FormBuilder,FormGroup,ReactiveFormsModule,Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductInsertDTO } from 'src/app/shared/interface/product';

@Component({
  selector: 'app-product-create',
  standalone:true,
  imports: [CrudNavbarComponent,ReactiveFormsModule],
  templateUrl: './product-create.component.html',
  styleUrl: './product-create.component.css'
})
export class ProductCreateComponent {

  createProductForm: FormGroup;

  constructor(private fb: FormBuilder, private productService: ProductService) {
    this.createProductForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      category: ['', Validators.required],
      brand: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      quantity: [0, [Validators.required, Validators.min(0)]],
      isAvailable: [true, Validators.required],
      description: ['', Validators.required]
    });
  }

  onSubmit(): void {
    if (this.createProductForm.valid) {
        const product = this.createProductForm.value as ProductInsertDTO;

        this.productService.createProduct(product).subscribe({
            next: (response) => {
                console.log('Product created successfully:', response);
                alert('Product created successfully!');
                this.createProductForm.reset();
            },
            error: (err) => {
                console.error('Error creating product:', err);
                alert(`Error creating product: ${err.message}`);
            }
        });
    } else {
        alert('Please fill in all required fields.');
    }
}

}
