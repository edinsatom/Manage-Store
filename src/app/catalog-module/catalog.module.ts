import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CommonsModule } from '../common-module/commons.module';



@NgModule({
  declarations: [
    CatalogComponent,
  ],
  imports: [
    CommonModule,
    CommonsModule
  ],
  exports: [
    CatalogComponent
  ]
})
export class CatalogModule { }
