import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { AppState } from '@root/app/app.reducer';
import { AuthFacade } from '@auth-module/facades/auth.facade';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent {

  @Input() isAuthenticate: boolean = false;

  constructor(
    private router: Router,
    private store:Store<AppState>,
    private authFacade: AuthFacade
  ) { }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
  }

  login(): void {
    this.router.navigateByUrl('/login')
  }

  logout(): void {
    this.authFacade.logoutUser()
      .then( resp => {
        window.location.reload()
      })
      .catch(err => {
        console.log(err.message);
        
      })
  }

}
