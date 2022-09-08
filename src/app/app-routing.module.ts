import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RegisterComponent } from './auth-module/components/register/register.component';
import { CreateProductComponent } from './products-module/components/create-product/create-product.component';
import { ProductsComponent } from './products-module/components/products/products.component';
import { ProfileComponent } from './profile-module/components/profile/profile/profile.component';

import { GuardGuard } from './common-module/guard/guard.guard';


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