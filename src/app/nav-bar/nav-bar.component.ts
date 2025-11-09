import { Component, OnInit } from '@angular/core';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent implements OnInit {
  cartproducts:any[]=[];
  constructor(private cartService: CartService) {
    this.cartService.cartAddSubject.subscribe((data:any)=>{
      this.loadCartProducts();
    
    });
  }
  ngOnInit(): void {
    this.loadCartProducts();
  }
  loadCartProducts(){
    this.cartproducts=this.cartService.getCart();
  }

  removeFromCart(index: number, event: Event) {
    event.preventDefault();
    event.stopPropagation();
    this.cartService.removeFromCart(index);
    this.loadCartProducts();
    this.cartService.cartAddSubject.next(true);
  }

  getTotalPrice(): number {
    return this.cartproducts.reduce((total, item) => total + item.price, 0);
  }
}
