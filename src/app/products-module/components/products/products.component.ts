import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ProductModel } from '../../models/product.model';


import Swal from 'sweetalert2';
import { AuthService } from 'src/app/auth-module/services/auth.service';
import { ProductsFacade } from '../../facades/products.facade';
import { UiFacade } from 'src/app/common-module/facades/ui-facade';
import { AuthFacade } from 'src/app/auth-module/facades/auth.facade';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
  })
export class ProductsComponent implements OnInit, OnDestroy {

  cargando:boolean = true;
  buscado:string='';
  opcion:number = 0;
  minInventario:number = 50;
  orden1:string = '-';
  orden2:string = '-';
  products: ProductModel[] = [];

  private subs: Subscription = new Subscription();

  constructor(
    public authFacade:AuthFacade, 
    private uiFacade: UiFacade,
    private producFacade:ProductsFacade
  ) { 
  }

  ngOnInit(): void {
    
    this.subs.add( 
      this.uiFacade.getLoading().subscribe( resp => {
        if(!resp) {
          this.subs.add(this.producFacade.getAllProducts().pipe(
            tap( resp => {
              this.cargando = false;
              this.products = resp;
            })
          ).subscribe())
        }
      })
    )
    
  }

  ngOnDestroy(): void {
    
    this.subs.unsubscribe();
  }

  deleteProduct( item: ProductModel ){
    Swal.fire({
      title: 'Esta seguro?',
      text: `Esta seguro que desea borrar el producto ${item.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    }).then( resp => {
      if( resp.value ){
        if(item.uid)
        this.producFacade.deleteProduct(item.uid)
          .then( resp => Swal.fire('Registro borrado', 'Registro borrado correctamente', 'success'))
          .catch( err => Swal.fire('Oppss...', err.message, 'error'))
      }
    })
  }


  ordenar(col: string ){
    let ordenados:any[] = this.products.slice();
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
    this.products = ordenados;
  }
  
  ordenarNombre(col: string ){
    let ordenados:any[] = this.products.slice();
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
    this.products = ordenados;
  }
}
