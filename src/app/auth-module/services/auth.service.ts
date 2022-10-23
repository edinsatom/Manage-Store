import { Injectable } from '@angular/core';
import { IUserModel } from '../../common-module/models/user.model';
import { Observable } from 'rxjs';
import {
  createUserWithEmailAndPassword,
  getAuth,
  signInWithEmailAndPassword,
  signOut,
  User,
  UserCredential
} from "firebase/auth"
import { authState } from '@angular/fire/auth'
import { initializeApp } from 'firebase/app';
import { environment } from '@root/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private app = initializeApp(environment.firebaseConfig);
  private auth = getAuth(this.app);

  authListener(): Observable<User | null> {
    return authState(this.auth)
  }

  createUser(userData: IUserModel, password: string): Promise<UserCredential> {
    return createUserWithEmailAndPassword(this.auth, userData.email, password)
  }

  loginUser(email: string, password: string): Promise<UserCredential> {
    return signInWithEmailAndPassword(this.auth, email, password);
  }

  logoutUser(): Promise<void> {

    return signOut(this.auth);
  }

}