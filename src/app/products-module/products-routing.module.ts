

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from './components/base/base.component';
import { CreateProductComponent } from './components/create-product/create-product.component';
import { ProductsComponent } from './components/products/products.component';

export const routes: Routes = [
    { path: '', 
    component: BaseComponent, 
    children: [
        { path: '', component: ProductsComponent },
        { path: 'product/:id', component: CreateProductComponent }
    ]
 },
    
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ProductsRoutingModule { }