import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css'
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  groupedItems: any[] = [];
  subtotal: number = 0;
  tax: number = 0;
  total: number = 0;
  taxRate: number = 0.1; // 10% tax

  constructor(private cartService: CartService) {
    this.cartService.cartAddSubject.subscribe(() => {
      this.loadCart();
    });
  }

  ngOnInit(): void {
    this.loadCart();
  }

  loadCart() {
    this.cartItems = this.cartService.getCart();
    this.groupItems();
    this.calculateTotals();
  }

  groupItems() {
    const itemMap = new Map();
    
    this.cartItems.forEach(item => {
      const key = item.id;
      if (itemMap.has(key)) {
        itemMap.get(key).quantity += 1;
      } else {
        itemMap.set(key, { ...item, quantity: 1 });
      }
    });
    
    this.groupedItems = Array.from(itemMap.values());
  }

  calculateTotals() {
    this.subtotal = this.cartItems.reduce((sum, item) => sum + item.price, 0);
    this.tax = this.subtotal * this.taxRate;
    this.total = this.subtotal + this.tax;
  }

  removeItem(itemId: number) {
    const index = this.cartItems.findIndex(item => item.id === itemId);
    if (index !== -1) {
      this.cartService.removeFromCart(index);
      this.loadCart();
      this.cartService.cartAddSubject.next(true);
    }
  }

  removeAllItems(itemId: number) {
    // Remove all instances of this item
    this.cartItems = this.cartService.getCart();
    let removed = false;
    for (let i = this.cartItems.length - 1; i >= 0; i--) {
      if (this.cartItems[i].id === itemId) {
        this.cartService.removeFromCart(i);
        removed = true;
      }
    }
    if (removed) {
      this.loadCart();
    }
  }

  updateQuantity(itemId: number, change: number) {
    const item = this.groupedItems.find(i => i.id === itemId);
    if (item) {
      if (change > 0) {
        // Add item
        const originalItem = this.cartItems.find(i => i.id === itemId);
        if (originalItem) {
          this.cartService.addToCart(originalItem);
        }
      } else if (change < 0 && item.quantity > 1) {
        // Remove one instance
        const index = this.cartItems.findIndex(i => i.id === itemId);
        if (index !== -1) {
          this.cartService.removeFromCart(index);
        }
      }
      this.loadCart();
    }
  }

  clearCart() {
    if (confirm('Are you sure you want to clear your cart?')) {
      this.cartService.clearCart();
      this.loadCart();
    }
  }

  checkout() {
    if (this.cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    alert('Thank you for your purchase! Your order has been placed.');
    this.cartService.clearCart();
    this.loadCart();
  }

  getStars(rating: number): number[] {
    const stars = Math.round(rating || 0);
    return Array(stars).fill(0);
  }
}
