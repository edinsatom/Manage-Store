import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  constructor(
    private router: Router,
    private auth: AuthService
  ) { }

  ngOnInit(): void {
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
