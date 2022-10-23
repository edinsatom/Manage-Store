import { Component, OnInit } from '@angular/core';
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
