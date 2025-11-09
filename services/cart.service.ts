import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: any[] = JSON.parse(localStorage.getItem('cart') || '[]');
  private cartSubject = new BehaviorSubject<any[]>(this.cartItems);
public cartAddSubject = new Subject<boolean>();
  cart$ = this.cartSubject.asObservable();
  constructor() { }

  private saveToStorage() {
    localStorage.setItem('cart', JSON.stringify(this.cartItems));
  }

  addToCart(product: any) {
    this.cartItems.push(product);
    this.cartSubject.next(this.cartItems);
    this.cartAddSubject.next(true);
    this.saveToStorage();
  }
  getCart() {
    return this.cartItems;
  }
  removeFromCart(index: number) {
    this.cartItems.splice(index, 1);
    this.cartSubject.next(this.cartItems);
    this.saveToStorage();
  }
  clearCart() {
    this.cartItems = [];
    this.cartSubject.next(this.cartItems);
    localStorage.removeItem('cart');
  }
}
