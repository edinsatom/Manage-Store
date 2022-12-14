import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StoreModule } from '@ngrx/store';

import { FilterPipe } from './pipes/filter.pipe';

import { ProductsComponent } from './components/products/products.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { BaseComponent } from './components/base/base.component';
import { ProductsRoutingModule } from './products-routing.module';
import { productsReducer } from './store/poducts.reducer'
import { CommonsModule } from '../common-module/commons.module';




@NgModule({
  declarations: [
    BaseComponent,
    ProductsComponent,
    CreateProductComponent,
    FilterPipe,
  ],
  imports: [
    FormsModule,
    CommonModule,
    CommonsModule,
    RouterModule,
    StoreModule.forFeature('inventory', productsReducer),
    ScrollingModule,
    ReactiveFormsModule,
    ProductsRoutingModule,
    CommonsModule
  ]
})
export class ProductsModule { }
