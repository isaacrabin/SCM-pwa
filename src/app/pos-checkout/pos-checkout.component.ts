import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { map, tap } from 'rxjs';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';
import * as PosCartActions from '../shared/store/pos/pos-cart.actions';
import { PosCartItem } from '../shared/store/pos/pos-cart.model';
import * as PosCartSelectors from '../shared/store/pos/pos-cart.selector';

// TODO: refactor to be a reusable component

@Component({
  standalone: true,
  selector: 'app-pos-checkout',
  templateUrl: './pos-checkout.component.html',
  styleUrls: ['./pos-checkout.component.scss', '../restock-cart/restock-cart.component.scss'],
  imports: [IonicModule, NgFor, NgIf, AsyncPipe, DecimalPipe, NgFor, DashboardItemComponent]
})
export class PosCheckoutComponent implements OnInit {

  constructor(private router: Router, private store: Store<any>) { }

  items$ = this.store.select(PosCartSelectors.selectCartState)
    .pipe(map(res => {
      const totalItems = res.items.reduce((acc, item) => acc + item.quantity, 0);
      const totalPrice = res.items.reduce((acc, item) => acc + (item.price * item.quantity), 0);
      return {
        ...res,
        totalItems,
        totalPrice
      }
    }));

  isCheckingOut$ = this.store.select(PosCartSelectors.selectIsCheckingOut).pipe(
    tap(resp => console.log('checkingOut: ', resp))
  )


  ngOnInit() {
  }

  goBack() {
    this.router.navigateByUrl('/pos');
  }


  addToCart(item: PosCartItem) {
    // const cartItem: PosCartItem = {
    //   item_id: item.item_id,
    //   item_name: item.item_name,
    //   quantity: 1,
    //   price: item.price
    // }
    this.store.dispatch(PosCartActions.addItem({ item: { ...item, quantity: 1 } }))
  }

  reduceFromCart(item: PosCartItem) {
    this.store.dispatch(PosCartActions.reduceItem({ itemId: item.item_id }))
  }

  removeFromCart(item: PosCartItem) {
    this.store.dispatch(PosCartActions.removeItem({ itemId: item.item_id }))
  }

  checkOut() {
    this.store.dispatch(PosCartActions.checkout());
  }
}
