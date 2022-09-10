import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../common-module/services/auth.service';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { UiFacade } from 'src/app/common-module/facades/ui-facade';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  isLoading: boolean = false;
  subs: Subscription;

  constructor(
    private fb: FormBuilder,
    private uiFacade: UiFacade,
    private router: Router,
    public auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    this.subs = uiFacade.getLoading().subscribe(resp => this.isLoading = resp)

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  createUser() {

    if (this.registerForm.invalid) return;

    this.uiFacade.initLoading();

    this.auth.createUser(this.registerForm.value)
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
          title: 'Opps...',
          text: err.message,
        })
      })

  }
}
