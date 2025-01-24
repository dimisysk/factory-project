import { Component, Inject } from '@angular/core';
import {MAT_DIALOG_DATA,MatDialogRef} from '@angular/material/dialog'
import { CommonModule } from '@angular/common';
import { CartService } from 'src/app/shared/service/cart.service';

@Component({
  selector: 'app-product-details',
  standalone:true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent {

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private dialogRef: MatDialogRef<ProductDetailsComponent>,
    private cartService: CartService
  ) {}

  addToCart(product: any): void {
    this.cartService.addToCart(product);
    this.dialogRef.close();
  }

  closeCart(): void {
    console.log('Dialog closed');
    this.dialogRef.close(); // Κλείνει τον διάλογο
  }

}
