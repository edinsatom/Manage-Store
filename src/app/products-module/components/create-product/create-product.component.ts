import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';


import Swal from 'sweetalert2';

import { CountriesService } from 'src/app/common-module/services/countries.service';
import { ProductsFacade } from '../../facades/products.facade';

@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit {

  productForm: FormGroup;
  countriesList: any[] = [];
  idProduct: string | null = null;
  archivo!: File;
  nombreArchivo!: string;
  errorArchivo!: string;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paiService: CountriesService,
    private productFacade: ProductsFacade,
    ) {
      this.productForm = this.fb.group({
        id:      [{value: '', disabled: true}],
        name: ['', [Validators.required, Validators.minLength(4)]],
        details: ['', [Validators.required]],
        country: new FormControl(this.countriesList),
        stock:   [{value: ''}, [Validators.required, Validators.min(1)]],
        price:   [{value: ''}, [Validators.required, Validators.min(2000)]]
      })
  }

  ngOnInit(): void {

    console.log(this.route.snapshot.params['id']);

    this.idProduct = this.route.snapshot.params['id'];

    // if (!!this.idProduct && this.idProduct != 'new') {
    //   this.producService.getProducto(this.idProduct)
    //     .subscribe((resp: any) => {
    //       this.producto = resp;
    //       this.producto.id = this.idProduct;
    //       // this.producService.obtenerImagen(this.producto.imagen.nameFile)
    //       //   .subscribe( resp => this.producto.imagen.url = resp);
    //     })
    // }

    this.paiService.obtenerPaises()
      .subscribe((resp: any[]) => {
        this.countriesList = resp;
      });

  }


  leerArchivo(event: any): boolean {
    if (event.target.files[0]) {
      this.archivo = event.target.files[0];
      // this.producto.imagen = new ProductFile( this.archivo );
    }
    return this.validaArchivo();
  }

  save(): void {
    console.log(this.productForm);
    
    this.productFacade.addProduct(this.productForm.value)
      .then( resp => {
        Swal.fire('Éxito!!!', 'Registro guardado', 'success');
        this.productForm.reset();
      })
      .catch( err => {
        Swal.fire('Oopps!!!', err.message, 'error');
      })
    
  }

  actPrecio(e: string): void {

    // this.producto.precio = Number(e);

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


}
