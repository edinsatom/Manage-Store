import { Injectable } from '@angular/core';
import { UserModel } from '../../common-module/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map, Observable } from 'rxjs';
import 'firebase/firestore'

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
  ) { }
  
  login( user:UserModel ):boolean{
    if(user.userName == 'admin' && user.password == '123456'){
      localStorage.setItem('token', 'token_de_usuario_12345');
      return true;
    }
    return false;
  }

  logout(){
    localStorage.removeItem('token');
  }

  isAuthenticate():Observable<boolean>{

    return this.auth.authState.pipe(
      map( resp => resp != null )
    );
  }

  initAuthListener(){
    this.auth.authState.subscribe( (user: any) => {
      console.log(user?.multiFactor?.user?.email)
      console.log(user?.multiFactor?.user?.uid)
    })
  }

  createUser( userData: UserModel ): Promise<any>{
    const { email, password } = userData;
    
    return this.auth.createUserWithEmailAndPassword(email, password)
      .then( (resp) => {
        const {user} = resp;
        
        const uid = user?.uid ? user?.uid : '';
        
        const newUser = new UserModel(uid, userData.userName, userData.email, '');

        return this.firestore.doc(`${uid}/profile`).set({...newUser});
      })
  }

  loginUser( user: UserModel ):Promise<any> {
    const { email, password } = user;

    return this.auth.signInWithEmailAndPassword(email, password );
  }

  logoutUser(): Promise<any>{
    console.log('cerrando sesión');
    
    return this.auth.signOut();
  }

}