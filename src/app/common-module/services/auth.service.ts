import { Injectable } from '@angular/core';
import { FireUser, UserModel } from '../../common-module/models/user.model';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore'
import { map, Observable, Subscription } from 'rxjs';
import 'firebase/firestore'
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/auth-module/store/auth.actions';
import { UiFacade } from '../facades/ui-facade';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private subs: Subscription = new Subscription();
  private collection: string = '/profile';

  private _user: FireUser | null = null;

  constructor(
    private uiFacade: UiFacade,
    private auth: AngularFireAuth,
    private firestore: AngularFirestore,
    private store: Store<AppState>
  ) { }

  get user(){
    return this._user;
  }

  isAuthenticate(): Observable<boolean> {
    return this.auth.authState.pipe(
      map(resp => resp != null)
    );
  }

  initAuthListener() {
    this.auth.authState.subscribe((resp: any) => {
      if (resp) {
        const { user } = resp?.multiFactor;
        this.subs = this.firestore.doc(`${user.uid}${this.collection}`).valueChanges()
          .subscribe((fireUser: any) => {            
            this._user = {...fireUser};
            this.store.dispatch(actions.setUser({ user: fireUser }))
            this.uiFacade.stopLoading();
          })
      }
      else {
        this._user = null;
        this.subs.unsubscribe();
        this.store.dispatch(actions.unSetUser())
      }
    })
  }

  createUser(userData: UserModel): Promise<any> {
    const { email, password } = userData;

    return this.auth.createUserWithEmailAndPassword(email, password)
      .then((resp) => {
        const { user } = resp;

        const uid = user?.uid ? user?.uid : '';

        const fireUser = new FireUser(userData.userName, userData.email, uid);

        return this.firestore.doc(`${uid}${this.collection}`).set({ ...fireUser });
      })
  }

  loginUser(user: UserModel): Promise<any> {
    this.uiFacade.initLoading();
    const { email, password } = user;
    return this.auth.signInWithEmailAndPassword(email, password);
  }

  logoutUser(): Promise<any> {

    return this.auth.signOut();
  }

}