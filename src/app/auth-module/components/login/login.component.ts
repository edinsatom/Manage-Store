import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/common-module/services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    public auth: AuthService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

  }

  ngOnInit(): void {

  }

  send() {

    if (this.loginForm.invalid) return;

    if (this.auth.login(this.loginForm.get('userName')?.value))
      this.router.navigateByUrl('/products');
  }

  loginUser() {

    if (this.loginForm.invalid) return;


    Swal.fire({
      title: 'Revisando tus datos!',
      html: 'Espérate un momentico...',
      didOpen: () => {
        Swal.showLoading()
      }
    })

    this.auth.loginUser(this.loginForm.value)
      .then(() => {
        setTimeout(() => {
          Swal.close();
          this.router.navigate(['/products'])
        }, 2000);
      })
      .catch((err) => {
        Swal.fire({
          icon: 'error',
          title: 'Oopps...',
          text: err.message
        })

      })

  }

}
