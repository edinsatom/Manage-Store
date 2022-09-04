import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products/products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { ReusablesModule } from './reusables/reusables.module';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CreateProductComponent,
    ProfileComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReusablesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
