import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './components/products/products/products.component';
import { CreateProductComponent } from './components/products/create-product/create-product.component';
import { ProfileComponent } from './components/profile/profile/profile.component';
import { RegisterComponent } from './components/auth/register/register.component';

import { ReusablesModule } from './reusables/reusables.module';

import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import 'firebase/storage';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CreateProductComponent,
    ProfileComponent,
    RegisterComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ScrollingModule,
    AppRoutingModule,
    ReusablesModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
