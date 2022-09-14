import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { take, tap } from 'rxjs/operators'
import { AuthFacade } from 'src/app/auth-module/facades/auth.facade';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthFacade,
    private router: Router
  ) { }

  canLoad():Observable<boolean> {
    return this.auth.isAuthenticate().pipe(
      tap( (isAuth:boolean) => {
        if (!isAuth) {
          this.router.navigate(['/login'])
        }
      }),
      take(1)
    );
  }

  canActivate():Observable<boolean> {
    return this.auth.isAuthenticate().pipe(
      tap( (isAuth:boolean) => {
        if (!isAuth) {
          this.router.navigate(['/login'])
        }
      })
    );
  }
  
}
