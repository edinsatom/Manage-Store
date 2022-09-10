import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';

import { CommonsModule } from './common-module/commons.module';

import { AppRoutingModule } from './app-routing.module';
import { FilterPipe } from './products-module/pipes/filter.pipe';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import 'firebase/storage';
import { FIREBASE_OPTIONS } from '@angular/fire/compat';

import { ScrollingModule } from '@angular/cdk/scrolling';
import { environment } from 'src/environments/environment';


import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { ProductsComponent } from './products-module/components/products/products.component';
import { CreateProductComponent } from './products-module/components/create-product/create-product.component';
import { ProfileComponent } from './profile-module/components/profile/profile/profile.component';
import { AuthModule } from './auth-module/auth-module.module';
import { appReducers } from './app.reducer';


@NgModule({
  declarations: [
    AppComponent,
    ProductsComponent,
    CreateProductComponent,
    ProfileComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AuthModule,
    ReactiveFormsModule,
    ScrollingModule,
    CommonsModule,
    AppRoutingModule,
    StoreModule.forRoot(appReducers),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: environment.production
    }),
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireStorageModule,
    HttpClientModule
  ],
  providers: [
    { provide: FIREBASE_OPTIONS, useValue: environment.firebaseConfig }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
