import { Injectable } from '@angular/core';
import { IUserModel } from '@common-module/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Observable } from 'rxjs';
import 'firebase/firestore'
import firebase from "firebase/compat/app";

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(
    private auth: AngularFireAuth
  ) { }

  authListener(): Observable<firebase.User | null>{
    return this.auth.authState
  }

  createUser(userData: IUserModel, password: string): Promise<firebase.auth.UserCredential> {
    return this.auth.createUserWithEmailAndPassword(userData.email, password)
  }

  loginUser(email: string, password: string): Promise<any> {
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<any> {

    return this.auth.signOut();
  }

}