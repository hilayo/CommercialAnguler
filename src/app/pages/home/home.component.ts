import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { CartService } from '../../services/cart.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  productsList: any[] = [];
  constructor(private productService: ProductService,private cartService: CartService) {}

  ngOnInit(): void {
  this.loadAllProducts();
}
loadAllProducts(){
  this.productService.getallproducts().subscribe((data:any)=>{
    this.productsList=data
  });
}
addToCart(product:any){
  this.cartService.addToCart(product);
  alert('Product added to cart');
}

getStars(rating: number): number[] {
  const stars = Math.round(rating || 0);
  return Array(stars).fill(0);
}

}





