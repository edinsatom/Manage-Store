import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CatalogComponent } from './components/catalog/catalog.component';
import { CommonsModule } from '../common-module/commons.module';
import { SidebarComponent } from './components/sidebar/sidebar.component';



@NgModule({
  declarations: [
    CatalogComponent,
    SidebarComponent
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
