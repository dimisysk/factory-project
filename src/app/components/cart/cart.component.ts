import { Component } from '@angular/core';
import { CartService } from 'src/app/shared/service/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent {
  cartItems: any[] = [];
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartItems = this.cartService.getCartItems();
  }
  checkout(): void {
    console.log('Checkout:', this.cartItems);
    alert('Order placed successfully!');
    this.cartService.clearCart();
    this.cartItems = [];
  }
  

addToCart(item: any): void {
  const existingItem = this.cartItems.find(cartItem => cartItem.id === item.id);
  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    this.cartItems.push({ ...item, quantity: 1 }); 
  }
  console.log('Added to cart:', this.cartItems);
}

removeFromCart(item: any): void {
  this.cartService.removeFromCart(item);
  this.cartItems = this.cartService.getCartItems(); 
}

increaseQuantity(item: any): void {
  item.quantity += 1; 
}

decreaseQuantity(item: any): void {
  if (item.quantity > 1) {
    item.quantity -= 1; 
  } else {
    this.removeFromCart(item); 
  }
}
  
}
