import { Component, OnInit } from '@angular/core';
import { FileModel, ProductFile } from 'src/app/products-module/models/file.model';
import { UserModel } from 'src/app/common-module/models/user.model';
import { ProductsService } from 'src/app/products-module/facades/products.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  file!:FileModel;
  user!:UserModel;
  loading = true;
  
  constructor(
    private prodService:ProductsService
  ) { }

  ngOnInit(): void {
    this.prodService.getUsuario()
      .subscribe( (resp:UserModel) => {
      this.user = resp;
      this.prodService.obtenerImagen(this.user.img).subscribe( (resp:any) => {
        this.user.img = resp;
        this.loading = false;
      });
    });
  }

  readFile( event: any ){
    this.file = new ProductFile( event.target.files[0] );
  }

  uploadFile(){
    this.prodService.uploadFile( this.file );
    this.prodService.obtenerImagen('perfil.jpg').subscribe( (resp:any) => {
      this.user.img = resp;
    });
  }

}
