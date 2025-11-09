import { Component } from '@angular/core';
import { CartService } from './services/cart.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ecommerce';
  cartproducts:any[]=[];
  constructor(private cartService: CartService) {
   // this.cartService.cartAddSubject.subscribe((data:any)=>{
    //  this.loadCartProducts();
   //  alert('Product added to cart');
    //});
  }
 // loadCartProducts(){
  //  this.cartproducts=this.cartService.getCart();
 // }
}
