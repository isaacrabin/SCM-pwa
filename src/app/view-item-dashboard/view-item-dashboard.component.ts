import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';

@Component({
  selector: 'app-view-item-dashboard',
  templateUrl: './view-item-dashboard.component.html',
  styleUrls: ['./view-item-dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule],
})
export class ViewItemDashboardComponent implements OnInit {
  item!: GetItemsResults;
  itemId!: string;

  @Input()
  set id(id: string) {
    this.fetchOrPassed(id)
  }

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController) { }

  ngOnInit() {
  }

  fetchOrPassed(id: string) {
    const state = this.router.getCurrentNavigation()?.extras.state as GetItemsResults;

    if (state) {
      console.log('yes, state??',);
      this.item = state;
    } else {
      this.getItemDetails(id)
    }
  }

  getItemDetails(id: string) {
    console.log('have to make http call',);
  }

  async presentAlert() {
    const alert = await this.alertCtrl.create({
      cssClass: 'my-custom-class',
      header: 'Add to Cart',
      // subHeader: ``,
      message:
        `${this.item.item_name} will be added to the cart`,
      backdropDismiss: true,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          // handler: () => {
          //   // return;
          // }
        },
        {
          text: 'Ok',
          handler: () => {
            // this._modalCtr.dismiss();
            this.addToCart()
          }
        },
      ]
    });

    await alert.present();

  }

  addToCart() {
    this.presentToastWithOptions(`${this.item.item_name} has been added to the cart. You can checkout later. `)
    this.router.navigateByUrl('/dashboard')
  }

  async presentToastWithOptions(msg: string) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position: 'top',
      buttons: [
        {
          text: 'Check Out?',
          // role: 'cancel',
          handler: () => {
            // do nothing
            this.router.navigateByUrl('/dashboard/restock')

          }
        }
      ],
      duration: 3000
    });
    toast.present();
  }

}
