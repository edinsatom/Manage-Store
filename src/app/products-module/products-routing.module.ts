

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BaseComponent } from '@products-module/components/base/base.component';
import { CreateProductComponent } from '@products-module/components/create-product/create-product.component';
import { ProductsComponent } from '@products-module/components/products/products.component';

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