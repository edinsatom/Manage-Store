import { Injectable } from '@angular/core';
import { UserModel } from 'src/app/common-module/models/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor() { }
  
  login( user:UserModel ):boolean{
    if(user.name == 'admin' && user.password == '123456'){
      localStorage.setItem('token', 'token_de_usuario_12345');
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAuthenticate():boolean{

    if(localStorage.getItem('token')) return true;

    return false
  }

}