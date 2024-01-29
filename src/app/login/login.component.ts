import { NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { EMPTY, catchError, finalize, tap } from 'rxjs';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { CreateAccountComponent } from '../create-account/create-account.component';
import { AuthService } from '../services/auth.service';
import { ToastService } from '../services/toast.service';
import { StorageService } from '../services/storage.service';
@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule, ReactiveFormsModule, NgFor, NgIf]
})
export class LoginComponent implements OnInit {

  validations = {
    email: [
      { type: 'required', message: 'Email is required.' },
    ],
    password: [
      { type: 'required', message: 'Password is required.' },
    ]
  }
  isLoginIn: boolean = false;

  constructor(
    private modalCtrl: ModalController,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private toastCtrl: ToastController,
    private toastSrv: ToastService,
    private authSrv: AuthService,
    private storageSrv: StorageService
  ) { }

  loginForm = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
    // this.createAccount();

  }

  async login() {

    this.loginForm.markAllAsTouched();
    // check if valid i.e all inputs are filled

    if (this.loginForm.valid) {
      const formValue = this.loginForm.value;

      const { email, password } = formValue;

      this.makeLoginRequest(email as string, password as string)

      // if (formValue.email === 'admin' && formValue.password === 'password') {
      //   this.loginForm.reset()
      //   this.router.navigate(['./pos'])
      // } else {
      //   const toast = await this.toastCtrl.create({
      //     header: 'Error ❗',
      //     message: 'Email and password do not match.',
      //     position: 'top',
      //     color: 'warning',
      //     duration: 3000
      //   });
      //   toast.present();
      // }
    } else {
      this.toastSrv.presentToastWithOptions('Please fill in all fields.');
    }

  }


  private makeLoginRequest(email: string, password: string) {
    this.isLoginIn = true;
    this.authSrv.login({ email, password })
      .pipe(
        tap(resp => {
          if (resp && resp.token) {
            sessionStorage.setItem('token', resp.token);
            this.loginForm.reset()
            this.router.navigate(['./home'])
          } else {
            this.toastSrv.presentToastWithOptions('Login was unsuccessful. Password and email do not match');
          }
        }),
        catchError(error => {
          console.error(error);
          this.toastSrv.presentToastWithOptions('Login was unsuccessful. Password and email do not match');
          return EMPTY;
        }),
        finalize(() => this.isLoginIn = false)
      )
      .subscribe()
  }
  async createAccount() {
    const modal = await this.modalCtrl.create({
      component: BaseModalComponent,
      componentProps: {
        rootPage: CreateAccountComponent
      }
    })
    return modal.present();
  }

}
