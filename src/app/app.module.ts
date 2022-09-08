import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ProductsComponent } from './products-module/components/products/products.component';
import { CreateProductComponent } from './products-module/components/create-product/create-product.component';
import { ProfileComponent } from './profile-module/components/profile/profile/profile.component';
import { RegisterComponent } from './auth-module/components/register/register.component';

import { CommonsModule } from './common-module/commons.module';

import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './products-module/pipes/filter.pipe';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import 'firebase/storage';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { environment } from 'src/environments/environment';
import { HttpClientModule } from '@angular/common/http';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { productsReducer } from './products-module/store/poducts.reducer';


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
    CommonsModule,
    AppRoutingModule,
    StoreModule.forRoot({ products : productsReducer}),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
