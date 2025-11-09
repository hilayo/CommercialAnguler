import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { CartComponent } from './pages/cart/cart.component';
import { SaleComponent } from './pages/sale/sale.component';
import { ContactComponent } from './pages/contact/contact.component';

export const routes: Routes = [
    {
        path:'*',
         pathMatch: 'full',
        component:HomeComponent
    }
    ,{
    path: '',
    redirectTo: '/products',
    pathMatch: 'full'
},
{
    path:'products',
    component:HomeComponent
},
{
    path:'cart',
    component:CartComponent
},{
    path:'sale',
    component:SaleComponent

},
{
    path:'contact',
    component:ContactComponent
}];
