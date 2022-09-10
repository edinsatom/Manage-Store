import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UiFacade } from 'src/app/common-module/facades/ui-facade';
import { AuthService } from 'src/app/common-module/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit, OnDestroy {

  loginForm: FormGroup;
  isLoading: boolean = false;
  subs: Subscription;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService,
    private uiFacade: UiFacade
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.subs = uiFacade.getLoading().subscribe( resp => this.isLoading = resp )

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  loginUser() {

    if (this.loginForm.invalid) return;

    this.uiFacade.initLoading();

    this.auth.loginUser(this.loginForm.value)
      .then(() => {
        setTimeout(() => {
          this.uiFacade.stopLoading();
          this.router.navigate(['/products'])
        }, 2000);
      })
      .catch((err) => {
        this.uiFacade.stopLoading();
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: err.message
        })

      })

  }

}
