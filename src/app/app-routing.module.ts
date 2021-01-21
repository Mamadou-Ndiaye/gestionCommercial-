import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {ProduitsComponent} from './produits/produits.component';
import {NewProductComponent} from './new-product/new-product.component';
import {ProductsComponent} from './products/products.component';
import {LoginComponent} from './login/login.component';
import {ProductDetailComponent} from './product-detail/product-detail.component';
import {CaddiesComponent} from './caddies/caddies.component';


const routes: Routes = [

  {path: 'produits', component: ProduitsComponent},
  {path: 'products/:p1/:p2', component: ProductsComponent},
  {path: 'new-product', component: NewProductComponent},
  {path: '', redirectTo: 'products/1/0', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'products-detail/:url', component: ProductDetailComponent},
  {path: 'caddies', component: CaddiesComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{ useHash : true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
