import { Component, OnInit } from '@angular/core';
import { UiFacade } from './common-module/facades/ui-facade';
import { AuthService } from './common-module/services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'store';

  constructor(
    private uiFacade: UiFacade,
    private auth: AuthService
  ) {}
  
  ngOnInit(){
    // this.uiFacade.initLoading();
    this.auth.initAuthListener();
  }
}
