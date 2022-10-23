import { Injectable } from '@angular/core';
import { IUserModel } from 'src/app/common-module/models/user.model';
import { AuthService } from '../services/auth.service';
import { FirestoreService } from 'src/app/common-module/services/firestore.service';
import { UiFacade } from 'src/app/common-module/facades/ui-facade';
import { Observable, Subscription } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.reducer';
import * as actions from 'src/app/auth-module/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthFacade {

  private collection: string = '/profile';
  private subs: Subscription = new Subscription();

  constructor(
    private store: Store<AppState>,
    private uiFacade: UiFacade,
    private authService: AuthService,
    private firestoreService: FirestoreService<IUserModel>
  ) { }

  isAuthenticate(): Observable<boolean> {
    return this.authService.authListener().pipe(
      map(resp => resp != null),
      tap(isAuth => this.store.dispatch(actions.isAuth({ isAuth })))
    );
  }

  initAuthListener() {
    this.authService.authListener().pipe(
      tap((resp: any) => {
        if (!!resp) {
          this.subs = this.firestoreService.subscribeToDoc(`${resp.uid}${this.collection}`).pipe(
            tap((resp: any) => {
              this.store.dispatch(actions.setUser({ user: { ...resp } }))
            })
          ).subscribe()
        }
        else {
          this.store.dispatch(actions.unSetUser());
          this.subs.unsubscribe();
        }
      })
    ).subscribe()
  }


  createUser(userData: IUserModel, password: string): Promise<IUserModel> {

    this.uiFacade.initLoading();

    return this.authService.createUser(userData, password)
      .then(res => {
        if (res.user) {
          const resp = {
            uid: res.user.uid,
            userName: userData.userName,
            email: userData.email
          } as IUserModel
          return Promise.resolve(resp)
        }
        else {
          this.uiFacade.stopLoading();
          return Promise.reject({ message: 'No fue posible crear el usuario' })
        }
      })
      .catch(err => {
        this.uiFacade.stopLoading();

        return Promise.reject({ message: 'No fue posible crear el usuario' })
      })
  }

  loginUser(email: string, password: string): Promise<boolean> {

    this.uiFacade.initLoading();

    return this.authService.loginUser(email, password)
      .then(res => {

        this.uiFacade.stopLoading();

        if (res) {
          return Promise.resolve(true)
        }
        return Promise.reject({ message: 'No fue posible iniciar sesión ahora' })
      })
      .catch(err => {
        this.uiFacade.stopLoading();

        return Promise.reject({ message: 'No fue posible iniciar sesión, intente mas tardecito.' })
      })
  }

  saveUserData(userData: IUserModel): Promise<boolean> {
    return this.firestoreService.addItemToDoc(`${userData.uid}${this.collection}`, userData)
      .then(res => {

        this.uiFacade.stopLoading();

        return Promise.resolve(true)
      })
      .catch(rej => {
        return Promise.reject(false)
      })
  }

  logoutUser(): Promise<any> {

    return this.authService.logoutUser();
  }

}