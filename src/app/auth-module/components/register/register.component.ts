import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { tap } from 'rxjs/operators'
import { UiFacade } from 'src/app/common-module/facades/ui-facade';
import { AuthFacade } from '../../facades/auth.facade';
import { IUserModel } from 'src/app/common-module/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit, OnDestroy {

  registerForm: FormGroup;
  isLoading: boolean = false;
  subs: Subscription = new Subscription();

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uiFacade: UiFacade,
    private authFacade: AuthFacade,
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  ngOnInit(): void {
    this.subs = this.uiFacade.getLoading().pipe(
      tap(resp => this.isLoading = resp)
    ).subscribe();
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }


  async register() {

    if (this.registerForm.invalid) return;

    const {userName, email, password } = this.registerForm.value

    try {
      const createUser = await this.authFacade.createUser({userName, email} as IUserModel, password);
      const saveUserProfile = await this.authFacade.saveUserData(createUser);
      
      if (saveUserProfile) {
        this.router.navigate(['products']);
      }
    } catch (error) {
      Swal.fire('Oppss!', 'Ha ocurrido un error', 'error')
    }
    
  }
}
