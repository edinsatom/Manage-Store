import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Product, ProductModel } from '../../models/product.model';


import Swal from 'sweetalert2';
import { CountriesService } from 'src/app/common-module/services/countries.service';
import { ProductsService } from '../../facades/products.facade';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  producto: ProductModel = new Product();
  paises: any[] = [];
  archivo!: File;
  minPrecio = 5000;
  idProduct!: string;
  nombreArchivo!: string;
  errorArchivo!: string;

  constructor(private paiService: CountriesService,
    private producService: ProductsService,
    private router: Router,
    private route: ActivatedRoute) {

  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params['id']);

    this.idProduct = this.route.snapshot.params['id'];

    if (!!this.idProduct && this.idProduct != 'new') {
      this.producService.getProducto(this.idProduct)
        .subscribe((resp: any) => {
          this.producto = resp;
          this.producto.id = this.idProduct;
          // this.producService.obtenerImagen(this.producto.imagen.nameFile)
          //   .subscribe( resp => this.producto.imagen.url = resp);
        })
    }

    this.paiService.obtenerPaises()
      .subscribe((resp: any[]) => {
        this.paises = resp;
      });

  }


  leerArchivo(event: any): boolean {
    if (event.target.files[0]) {
      this.archivo = event.target.files[0];
      // this.producto.imagen = new ProductFile( this.archivo );
    }
    return this.validaArchivo();
  }

  guardar(form: NgForm): void {

    let peticion: Observable<any>

    // if ( !this.validacion() || form.invalid ) return;

    Swal.fire({
      title: 'Espere',
      text: 'Guardando información de producto',
      icon: 'info',
      allowOutsideClick: false
    });
    Swal.showLoading();

    if (!this.producto.id) {
      peticion = this.producService.crearProducto(this.producto);
    }
    else {
      peticion = this.producService.actualizarProducto(this.producto);
    }

    peticion.subscribe(resp => {

      Swal.fire({
        title: this.producto.existencia,
        text: 'Se actualizó correctamente.',
        icon: 'success'
      })

      this.router.navigateByUrl(`/products`)
    })
  }

  actPrecio(e: string): void {

    this.producto.precio = Number(e);

  }

  validaArchivo(): boolean {

    if (!this.archivo) {
      this.errorArchivo = 'Debe seleccionar un archivo';
      return false;
    }
    if (this.archivo.type != 'image/jpeg' && this.archivo.type != 'image/png') {
      this.errorArchivo = 'Debe seleccionar un archivo jpg o png';
      return false;
    }
    if (this.archivo.size / 500000 > 1) {
      this.errorArchivo = 'El archivo debe tener un tamaña inferior a 1Mb';
      return false;
    }

    this.errorArchivo = '';
    return true;
  }

  private validacion(): boolean {
    if (!this.producto.id) {
      if (!this.validaArchivo()) return false;
    }
    if (!this.producto.origen) return false;
    // if ( Number(this.producto.precio) < this.minPrecio ) return false;
    if (this.producto.vendidas < 0) return false;
    if (this.producto.existencia < 0) return false;

    return true;
  }

}
