import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';

import { UserModel } from 'src/app/common-module/models/user.model';
import { AuthService } from 'src/app/common-module/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  public user: UserModel;

  constructor(private router: Router, public auth:AuthService ) {
    this.user = {
      name: 'admin',
    };
    this.user.password = '123456';
   }

  ngOnInit(): void {

    

  }

  send( form:NgForm ){

    if( form.invalid ) return;

    if(this.auth.login( this.user ))
      this.router.navigateByUrl('/products');
  }
}
