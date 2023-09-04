import { Component, OnInit } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule, ModalController, ToastController } from '@ionic/angular';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule, ReactiveFormsModule]
})
export class LoginComponent implements OnInit {

  constructor(
    private modalCtrl: ModalController,
    private fb: NonNullableFormBuilder,
    private router: Router,
    private toastCtrl: ToastController
  ) { }

  loginForm = this.fb.group({
    emailNumber: ['', Validators.required],
    password: ['', Validators.required]
  })

  ngOnInit() {
    // this.createAccount();
  }

  async login() {
    // check if valid i.e all inputs are filled

    if (!this.loginForm.valid) {
      // show errors
      return
    }

    const formValue = this.loginForm.value;

    if (formValue.emailNumber === 'admin' && formValue.password === 'password') {
      this.loginForm.reset()
      this.router.navigate(['./pos'])
    } else {
      const toast = await this.toastCtrl.create({
        header: 'Error ❗',
        message: 'Email and password do not match.',
        position: 'top',
        color: 'warning',
        duration: 3000
      });
      toast.present();
    }
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
