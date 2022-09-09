import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../common-module/services/auth.service';

import Swal from 'sweetalert2'

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.registerForm = this.fb.group({
      userName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {

  }

  send() {

    if (this.registerForm.invalid) return;

    if (this.auth.login(this.registerForm.get('userName')?.value))
      this.router.navigateByUrl('/products');
  }

  createUser() {

    if (this.registerForm.invalid) return;

    this.auth.createUser(this.registerForm.value)
      .then(() => {
        this.router.navigate(['/products'])
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Opps...',
          text: err.message,
        })
      })

  }
}
