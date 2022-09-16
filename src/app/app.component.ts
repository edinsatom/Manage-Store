import { Component, OnInit } from '@angular/core';
import { UiFacade } from './common-module/facades/ui-facade';
import { AuthService } from './auth-module/services/auth.service';
import { AuthFacade } from './auth-module/facades/auth.facade';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'store';

  constructor(
    private authFacade: AuthFacade
  ) {}
  
  ngOnInit(){
    this.authFacade.initAuthListener();
  }
}
