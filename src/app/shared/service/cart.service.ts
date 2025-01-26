import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  private cartItems: any[] = [];

  addToCart(product: any): void {
    const existingItem = this.cartItems.find((item) => item.id === product.id);
    if (existingItem) {
      existingItem.quantity += 1; 
    } else {
      this.cartItems.push({ ...product, quantity: 1 }); 
    }
    console.log('Cart items:', this.cartItems);
  }

  removeFromCart(product: any): void {
    this.cartItems = this.cartItems.filter((item) => item.id !== product.id);
    console.log('Item removed:', product);
  }

  getCartItems() {
    return this.cartItems;
  }

  clearCart(): void {
    this.cartItems = [];
  }
}
