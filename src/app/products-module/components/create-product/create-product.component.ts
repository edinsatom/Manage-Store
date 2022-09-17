import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


import Swal from 'sweetalert2';

import { ProductsFacade } from '@products-module/facades/products.facade';
import { Subscription, tap } from 'rxjs';
import { CountriesService } from '@common-services/countries.service';
import { ProductFile } from '@products-module/models/file.model';


@Component({
  selector: 'app-create-product',
  templateUrl: './create-product.component.html',
  styleUrls: ['./create-product.component.scss']
})
export class CreateProductComponent implements OnInit, OnDestroy {

  productForm: FormGroup;
  countriesList: any[] = [];
  idProduct: string | null = null;
  file: ProductFile | null = null;
  imgProduct: string | null = null;
  imgProductTemp: string = '';
  archivo: File | null = null;
  nombreArchivo!: string;
  errorArchivo!: string;
  uid: string | null = null;

  private subs: Subscription[] = [];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private paiService: CountriesService,
    private productFacade: ProductsFacade,
  ) {
    this.productForm = this.fb.group({
      id: [{ value: '', disabled: true }],
      name: ['', [Validators.required, Validators.minLength(4)]],
      details: ['', [Validators.required]],
      country: ['', [Validators.required]],
      stock: [, [Validators.required, Validators.min(1)]],
      price: [, [Validators.required, Validators.min(2000)]],
      image: ['', []]
    })
  }

  ngOnInit(): void {

    this.idProduct = this.route.snapshot.params['id'];

    this.subs.push(
      this.paiService.obtenerPaises().pipe(
        tap((resp: any[]) => {
          this.countriesList = resp;
        })
      ).subscribe()
    )

    this.subs.push(
      this.productFacade.getCurrentUser().pipe(
        tap(resp => {

          this.uid = null;

          if (resp) {
            this.uid = resp.uid

            if (!!this.idProduct && this.uid && this.idProduct != 'new') {
              this.subs.push(
                this.productFacade.getProduct(this.uid, this.idProduct).pipe(
                  tap((resp: any) => {
                    this.imgProduct = resp.image;
                    this.productForm.reset(resp)
                  })
                ).subscribe()
              )
            }
          }
        })
      ).subscribe()
    )

  }

  ngOnDestroy(): void {
    this.subs.map(x => x.unsubscribe());
    this.subs = [];
  }


  readFile(event: any): void | string {
    const eFile: File = event.target.files[0]

    if (!eFile) {
      return this.imgProductTemp = '';
    }

    const reader = new FileReader();
    reader.readAsDataURL(eFile);

    reader.onloadend = () => {
      this.imgProductTemp = reader.result as string;
    }

    this.file = new ProductFile(eFile);

  }

  getUrlProfileImage(relativePath: string): Promise<string> {
    return this.productFacade.getUrlProfileImage(`${relativePath}`)
  }

  async update() {

    if(this.idProduct==null || this.uid == null ) return;
    const uid = this.uid;
    const itemId = this.idProduct;
    if ( this.file) {
      try {
        const { file } = { ...this.file };
        const relativePath = this.generateImagePath(file.name, itemId)
        await this.updateRecordAndImage(file, relativePath, uid, itemId);

        return
        
      } catch (error: any) {
        Swal.fire('Error!!!', error, 'error');
      }
    }
    else {
      this.productFacade.updateProduct(uid, itemId, this.productForm.value)
      .then(() => Swal.fire('Exito!!!', 'Producto actualizado con éxito.', 'success'))
      .catch((err: any) => { Swal.fire('Oppsss!!', err.message, 'error') })
    }
  }

  generateImagePath(fileName: string, itemId: string): string {
    const ext = fileName.split('.')[fileName.split('.').length - 1]
    return `${itemId}/imgProduct.${ext}`;
  }

  async save(): Promise<void> {

    console.log(this.idProduct);
    
    if (this.idProduct != 'new') {
      this.update()
      return
    }

    if (this.productForm.invalid) return;

    if (this.file && this.uid) {
      const { file } = { ...this.file };
      const uid = this.uid;
      this.productFacade.addProduct(this.uid, this.productForm.value)
        .then(async resp => {

          try {

            const itemId = resp.id;
            const relativePath = this.generateImagePath(file.name, itemId)
            await this.updateRecordAndImage(file, relativePath, uid, itemId);

          } catch (error: any) {
            Swal.fire('Error!!!', error, 'error');
          }

        })
        .catch(rej => Swal.fire('Error!!!', rej.message, 'error'))
    }

  }

  async updateRecordAndImage(file: File, relativePath: string, uid: string, itemId: string) {
    this.productFacade.uploadProfileImage(file, relativePath)
      .then(() => {
        this.productFacade.getUrlProfileImage(relativePath)
          .then(resp => {
            const updateRecord = {
              ...this.productForm.value,
              image: resp
            }
            this.productFacade.updateProduct(uid, itemId, updateRecord)
              .then((res: any) => {
                Swal.fire('Éxito!!!', 'Registro guardado', 'success');
              })
              .catch((rej: any) => {
                Swal.fire('Error!!!', rej.message, 'error');
              })
          })
          .catch(rej => Swal.fire('Error!!!', rej.message, 'error'))
      })
      .catch(rej => Swal.fire('Error!!!', rej.message, 'error'))
    // this.productForm.reset();
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
