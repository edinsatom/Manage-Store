import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { ProductModel } from '../../models/product.model';

import * as productActions from '../../store/products.actions'

import Swal from 'sweetalert2';
import { AuthService } from 'src/app/common-module/services/auth.service';
import { ProductsService } from '../../facades/products.facade';

interface AppState {
  products: number
}

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styles: [`
  .list-container { height: 350px}
`]})
export class ProductsComponent implements OnInit {

  cargando:boolean = false;
  buscado:string='';
  opcion:number = 0;
  minInventario:number = 50;
  orden1:string = '-';
  orden2:string = '-';
  productos: ProductModel[];

  constructor(
    public store:Store<AppState>,
    public auth:AuthService, 
    private producService:ProductsService
  ) { 
    this.productos = [];
    this.store.select('products').pipe(
      tap(state => {
        console.log(state);
        
      })
    ).subscribe()
  }


  decProduct(){
    this.store.dispatch(productActions.deleteProduct({
      product: {
        id: '01',
        nombre: 'Producto 01',
        caracteristicas: '',
        email: '',
        origen: '',
        precio: 20,
        lanzamiento: '',
        vendidas: 2,
        existencia: 4
      }
    }))
  }

  reset(){
    this.store.dispatch(productActions.resetProduct())
  }

  ngOnInit(): void {
    
    this.cargando = true;
    this.producService.getProductos()
      .subscribe( resp => {
        this.productos = resp;
        this.cargando = false;
      });
  }

  borrarProducto( producto:ProductModel, i:number ){
    let prodTmp = this.productos.slice();

    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar el producto ${producto.nombre}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {
      if( resp.value ){
        prodTmp.splice(i, 1);
        this.producService.borrarProducto( producto ).subscribe();
        this.productos = prodTmp;
      }
    })

  }

  ordenar(col: string ){
    let ordenados:any[] = this.productos.slice();
    if(this.orden1 === '^'){
      ordenados.sort( (a, b ) => {
        if( a[col] > b[col] ) return -1;
        if( a[col] < b[col] ) return 1;
        return 0
      })
      this.orden1 = 'v';
    }
    else{
      ordenados.sort( (a, b ) => {
        if( a[col] > b[col] ) return 1;
        if( a[col] < b[col] ) return -1;
        return 0
      })
      this.orden1 = '^';
    }
    this.orden2 = '-';
    this.productos = ordenados;
  }
  
  ordenarNombre(col: string ){
    let ordenados:any[] = this.productos.slice();
    if(this.orden2 === '^'){
      ordenados.sort( (a, b ) => {
        return b[col].localeCompare(a[col])
      })
      this.orden2 = 'v';
    }
    else{
      ordenados.sort( (a, b ) => {
        return a[col].localeCompare(b[col])
      })
      this.orden2 = '^';
    }
    this.orden1 = '-';
    this.productos = ordenados;
  }
}
