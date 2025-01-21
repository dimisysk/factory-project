import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/shared/service/product.service';
import { ProductInsertDTO } from 'src/app/shared/interface/product';
import { FormGroup, FormBuilder, FormsModule, ReactiveFormsModule,Validator, Validators } from '@angular/forms';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { MatFormField, MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { ProductDetailsComponent } from '../../product-details/product-details.component';



@Component({
  selector: 'app-product-read',
  imports: [CommonModule,MatFormFieldModule,MatFormField,MatInputModule,MatSelectModule, FormsModule, MatButtonModule,ReactiveFormsModule],
  templateUrl: './product-read.component.html',
  styleUrl: './product-read.component.css'
})
export class ProductReadComponent implements OnInit {

  filtersForm: FormGroup;
  products: any[] = [];
  error: string | null = null;

  constructor(
    private fb: FormBuilder,
    private productService: ProductService,
    private dialog: MatDialog
  ) {
    this.filtersForm = this.fb.group({
      brand: [''], // Προαιρετικό φίλτρο brand
      category: [''], // Προαιρετικό φίλτρο category
      minPrice: [null, [Validators.min(0)]], // Φίλτρο για ελάχιστη τιμή
      maxPrice: [null, [Validators.min(0)]], // Φίλτρο για μέγιστη τιμή
      isAvailable: [true], // Προεπιλογή: true
    });
  }
  ngOnInit(): void {
    this.fetchProducts();
  }
  fetchProducts(): void {
    const filters = this.filtersForm.value; // Λαμβάνουμε τα φίλτρα από τη φόρμα
  
    this.productService.getProducts(filters).subscribe({
      next: (products) => {
        this.products = products;
        this.error = null; // Καθαρίζουμε τα σφάλματα αν η ανάκτηση είναι επιτυχής
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
      },
    });
  }
  
  


  applyFilters(): void {
    const filters = this.filtersForm.value;

    this.productService.getProducts(filters).subscribe({
      next: (response) => {
        this.products = response;
        this.error = null;
      },
      error: (err) => {
        console.error('Error fetching products:', err);
        this.error = 'Failed to load products. Please try again later.';
      },
    });
  }

  viewProduct(product: any): void {
    this.dialog.open(ProductDetailsComponent, {
      data: product,
    });
  }


}
