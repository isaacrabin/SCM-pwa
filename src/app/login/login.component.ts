import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { CreateAccountComponent } from '../create-account/create-account.component';

@Component({
  standalone: true,
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  imports: [IonicModule]
})
export class LoginComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {
    // this.createAccount();
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
