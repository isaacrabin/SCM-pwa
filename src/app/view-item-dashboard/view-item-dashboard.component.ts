import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, IonicModule, ToastController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';
import { AppState } from '../shared/interfaces/states.interface';
import { selectCartItems } from '../shared/store/inventory';
import * as CartActions from '../shared/store/inventory/cart.actions';
import { CartItem } from '../shared/store/inventory/cart.model';
import * as CartSelectors from '../shared/store/inventory/cart.selector';

@Component({
  selector: 'app-view-item-dashboard',
  templateUrl: './view-item-dashboard.component.html',
  styleUrls: ['./view-item-dashboard.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, NgFor],
})
export class ViewItemDashboardComponent implements OnInit {
  item!: GetItemsResults;
  itemId!: string;

  itemInCart$!: Observable<boolean>;

  cartItems$ = this.store.select(selectCartItems)
  paramId!: string;
  quantityInCart$!: Observable<number>;

  @Input()
  set id(id: string) {
    this.paramId = id;
    this.itemInCart$ = this.store.select(CartSelectors.isItemInCart(id));
    this.quantityInCart$ = this.store.select(CartSelectors.selectItemQuantity(id));
    this.fetchOrPassed(id);
  }

  constructor(
    private router: Router,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private store: Store<AppState>) { }

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
    const item: CartItem = {
      item_code: this.item.item_code,
      item_name: this.item.item_name,
      quantity: 1,
      image: this.item.image || null,
      standard_rate: this.item.standard_rate
    }
    this.store.dispatch(CartActions.addItem({ item }));
    // this.presentToastWithOptions(`${this.item.item_name} has been added to the cart. You can checkout later. `)
    // this.router.navigateByUrl('/dashboard')
  }

  removeFromCart() {
    this.store.dispatch(CartActions.removeItem({ itemName: this.item.item_name }))
  }

  reduceFromCart() {
    this.store.dispatch(CartActions.reduceItem({ itemName: this.item.item_name }))
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

  getCartItems() {
    console.log('clicked',);
    this.store.select(selectCartItems)
      .subscribe(resp => console.log('cart: ', resp))
  }


}
