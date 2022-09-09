import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class GuardGuard implements CanActivate {

  constructor(
    private auth: AuthService,
    private router: Router
  ) { }

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
