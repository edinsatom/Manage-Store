import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { UiFacade } from '@common-module/facades/ui-facade';
import { AuthFacade } from '@auth-module/facades/auth.facade';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uiFacade: UiFacade,
    private authFacade: AuthFacade,
  ) {
    this.loginForm = this.fb.group({
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.subs = this.uiFacade.getLoading().pipe(
      tap( resp => this.isLoading = resp )
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loginUser() {

    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;    

    this.authFacade.loginUser(email, password)
      .then(( resp: boolean ) => {
        if(resp) this.router.navigate(['/products'])
      })
      .catch((err) => {
        Swal.fire('Opps!!!', err.message, 'error')

      })

  }

}
