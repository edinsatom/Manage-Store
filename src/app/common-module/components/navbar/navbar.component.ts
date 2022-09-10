import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { Subscription } from 'rxjs';
import { AuthService } from '../../services/auth.service';

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
    private auth: AuthService
  ) { 
    this.subs = auth.isAuthenticate().subscribe(( resp: boolean) => this.isAuthenticate = resp)
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
    this.auth.logoutUser()
      .then( resp => {
        this.router.navigateByUrl('/login')
      })
      .catch(err => {
        console.log(err.message);
        
      })
  }

  isRegistred(){
    return this.auth.isAuthenticate();
  }

}
