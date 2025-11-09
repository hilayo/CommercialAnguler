import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-sale',
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{
  cartproducts:any[]=[];
  subTotal:number=0;
  constructor(private cartService: CartService) {
  }
  ngOnInit(): void {
    this.loadCartProducts();
  }
  loadCartProducts(){
    this.cartproducts=this.cartService.getCart();
  }
  getTotalPrice(): number {
    return this.cartproducts.reduce((total, item) => total + item.price, 0);
  }
}
