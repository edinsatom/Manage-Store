import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Store } from '@ngrx/store';
import { Subscription, tap } from 'rxjs';
import { AppState } from '@root/app/app.reducer';
import { AuthFacade } from '@auth-module/facades/auth.facade';


@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit, OnDestroy {

  subs: Subscription;
  isAuthenticate: boolean = false;

  constructor(
    private router: Router,
    private store:Store<AppState>,
    private authFacade: AuthFacade
  ) { 
    this.subs = this.authFacade.isAuthenticate().pipe(
      tap( resp => this.isAuthenticate = resp )
    ).subscribe()
  }

  ngOnInit(): void {
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
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
