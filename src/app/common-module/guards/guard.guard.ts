import { Injectable } from '@angular/core';
import { CanActivate, CanLoad, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { take, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanLoad {

  constructor(
    private auth: AuthService,
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
