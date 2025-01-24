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

  removeFromCart(item: any): void {
    const index = this.cartItems.findIndex(cartItem => cartItem.id === item.id);
    if (index > -1) {
      this.cartItems.splice(index, 1);
      console.log(`Removed ${item.name} from cart.`);
    }
  }
  
}
