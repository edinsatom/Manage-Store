import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription, tap } from 'rxjs';
import { UiFacade } from '@common-module/facades/ui-facade';
import { AuthFacade } from '@auth-module/facades/auth.facade';
import { ModalComponent } from '@root/app/common-module/components/modal/modal.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild('modal') modal!: ModalComponent;

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
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.subs = this.uiFacade.getLoading().pipe(
      tap(resp => this.isLoading = resp)
    ).subscribe()
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  loginUser() {

    console.log(this.loginForm.value);
    
    if (this.loginForm.invalid) return;

    const { email, password } = this.loginForm.value;

    this.authFacade.loginUser(email, password)
      .then((resp: boolean) => {
        if (resp) this.router.navigate(['/products'])
      })
      .catch((err) => {
        this.modal.showModal('Opps!!!', err.message)
      })
  }

}
