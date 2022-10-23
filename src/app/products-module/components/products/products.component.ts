import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { ProductModel } from '@products-module/models/product.model';

import { ProductsFacade } from '@products-module/facades/products.facade';
import { UiFacade } from '@common-module/facades/ui-facade';
import { AuthFacade } from '@auth-module/facades/auth.facade';
import { ModalComponent } from '@root/app/common-module/components/modal/modal.component';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal!: ModalComponent;

  private currentProduct!: ProductModel | null;

  cargando: boolean = true;
  minInventario: number = 50;
  orden1: string = '-';
  orden2: string = '-';
  products: ProductModel[] = [];
  uid: string | null = null;
  search: string = '';
  option: number = 0

  private subs: Subscription[] = [];

  constructor(
    public authFacade: AuthFacade,
    private uiFacade: UiFacade,
    private productFacade: ProductsFacade
  ) {
  }

  ngOnInit(): void {

    this.subs.push(
      this.productFacade.getCurrentUser().pipe(
        tap(resp => {
          if (resp) this.uid = resp.uid;
          else this.uid = null;
          this.uiFacade.getLoading().subscribe(resp => {
            if (!resp && this.uid) {
              this.subs.push(
                this.productFacade.getAllProducts(this.uid).pipe(
                  tap(resp => {
                    this.cargando = false;
                    this.products = resp;
                  })
                ).subscribe()
              )
            }
          })
        })
      ).subscribe()
    )



  }

  ngOnDestroy(): void {

    this.subs.forEach(x => x.unsubscribe())
    this.subs = [];
  }

  showModalConfirm(item: ProductModel) {
    this.modal.showConfirm({
      title: 'Esta seguro?',
      message: `Esta seguro que desea borrar el producto ${item.name}`,
      icon: 'question',
      showConfirmButton: true,
      showCancelButton: true,
    })
    this.currentProduct = item;
  }

  deleteProd(e: boolean) {
    if (e && !!this.currentProduct) {
      const item: ProductModel = this.currentProduct;
      if (item.uid && this.uid) {
        this.productFacade.deleteProduct(this.uid, item.uid)
          .then(resp => this.modal.showModal('Registro borrado', 'Registro borrado correctamente'))
          .catch(err => this.modal.showModal('Oppss...', err.message))
      }
    } else {
      this.currentProduct = null;
    }
  }


  ordenar(col: string) {
    let ordenados: any[] = this.products.slice();
    if (this.orden1 === '^') {
      ordenados.sort((a, b) => {
        if (a[col] > b[col]) return -1;
        if (a[col] < b[col]) return 1;
        return 0
      })
      this.orden1 = 'v';
    }
    else {
      ordenados.sort((a, b) => {
        if (a[col] > b[col]) return 1;
        if (a[col] < b[col]) return -1;
        return 0
      })
      this.orden1 = '^';
    }
    this.orden2 = '-';
    this.products = ordenados;
  }

  ordenarNombre(col: string) {
    let ordenados: any[] = this.products.slice();
    if (this.orden2 === '^') {
      ordenados.sort((a, b) => {
        return b[col].localeCompare(a[col])
      })
      this.orden2 = 'v';
    }
    else {
      ordenados.sort((a, b) => {
        return a[col].localeCompare(b[col])
      })
      this.orden2 = '^';
    }
    this.orden1 = '-';
    this.products = ordenados;
  }
}
