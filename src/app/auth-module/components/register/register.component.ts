import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../common-module/services/auth.service';

import Swal from 'sweetalert2'
import { Subscription } from 'rxjs';
import { UiFacade } from 'src/app/common-module/facades/ui-facade';
import { FireUser, UserModel } from 'src/app/common-module/models/user.model';
import { AuthFacade } from '../../facades/auth.facade';

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
    private authFacade: AuthFacade,
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

  register() {

    if (this.registerForm.invalid) return;

    this.uiFacade.initLoading();

    const userData = this.registerForm.value as UserModel

    this.authFacade.createUser(userData)
      .then( res => {
        this.authFacade.saveUserData( res as UserModel )
          .then( res => {
            console.log(res);
            
          })
          .catch ( err => {
            console.log(err);
            
          })
      })
      .catch( err => {
        console.log(err);
        
      })
    
  }
}
