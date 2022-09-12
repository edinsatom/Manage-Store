import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription, tap } from 'rxjs';
import { FireUser } from 'src/app/common-module/models/user.model';
import { FileModel, ProductFile } from 'src/app/products-module/models/file.model';
import { ProfileFacade } from '../../facades/profile.facade';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  file:FileModel | undefined;
  user:FireUser | undefined;
  loading: boolean = false;

  name: string | undefined

  private subs: Subscription = new Subscription()

  constructor(
    private profileFacade: ProfileFacade
  ) { 
  }

  ngOnInit(): void {
    this.subs = this.profileFacade.getUser().pipe(
      tap( (user:FireUser) => {
        this.user = { ...user };
      })
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  readFile( event: any ){
    this.file = new ProductFile( event.target.files[0] );
  }

  uploadFile(){
    
  }

}
