import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './components/auth/register/register.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ProductsComponent } from './components/products/products/products.component';
import { ProfileComponent } from './components/profile/profile/profile.component';

import { GuardGuard } from './guard/guard.guard';


const routes: Routes = [
  { path: 'products', component: ProductsComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent, canActivate: [ GuardGuard ] },
  { path: 'product/:id', component: CreateProductComponent, canActivate: [ GuardGuard ] },
  { path: '**', pathMatch: 'full', redirectTo: 'products' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }