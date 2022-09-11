import { Component, OnInit } from '@angular/core';
import { UserModel } from 'src/app/common-module/models/user.model';
import { AuthService } from 'src/app/common-module/services/auth.service';
import { ProductsFacade } from 'src/app/products-module/facades/products.facade';
import { FileModel, ProductFile } from 'src/app/products-module/models/file.model';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {

  file!:FileModel;
  user!:UserModel;
  loading = false;
  
  constructor(
    private auth: AuthService,
    private prodService:ProductsFacade
  ) { }

  ngOnInit(): void {
    // this.prodService.getUsuario()
    //   .subscribe( (resp:UserModel) => {
    //   this.user = resp;
    //   this.prodService.obtenerImagen(this.user.img).subscribe( (resp:any) => {
    //     this.user.img = resp;
    //     this.loading = false;
    //   });
    // });
  }

  readFile( event: any ){
    this.file = new ProductFile( event.target.files[0] );
  }

  uploadFile(){
    // this.prodService.uploadFile( this.file );
    // this.prodService.obtenerImagen('perfil.jpg').subscribe( (resp:any) => {
    //   this.user.img = resp;
    // });
  }

}
