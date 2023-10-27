import { AsyncPipe, DecimalPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';
import { AppState } from '../shared/interfaces/states.interface';
import * as CartActions from '../shared/store/inventory/cart.actions';
import * as CartSelectors from '../shared/store/inventory/cart.selector';
import { CartItem } from './../shared/store/inventory/cart.model';

@Component({
  standalone: true,
  selector: 'app-restock-cart',
  templateUrl: './restock-cart.component.html',
  styleUrls: ['./restock-cart.component.scss'],
  imports: [IonicModule, NgFor, NgIf, AsyncPipe, DecimalPipe, NgFor, DashboardItemComponent]
})
export class RestockCartComponent implements OnInit {

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]

  constructor(private router: Router, private store: Store<AppState>) { }

  items$ = this.store.select(CartSelectors.selectCartState)

  ngOnInit() {
  }

  goToNextPage() {
    this.router.navigate(['./dashboard/address']);
    // console.log('make order',  );
  }

  removeFromCart(item: CartItem) {
    this.store.dispatch(CartActions.removeItem({ itemName: item.item_name }))
  }

  reduceFromCart(item: CartItem) {
    this.store.dispatch(CartActions.reduceItem({ itemName: item.item_name }))
  }

  addToCart(cartItem: CartItem) {
    const item: CartItem = {
      item_code: cartItem.item_code,
      item_name: cartItem.item_name,
      quantity: 1,
      image: cartItem.image || null,
      standard_rate: cartItem.standard_rate
    }
    this.store.dispatch(CartActions.addItem({ item }));
    // this.presentToastWithOptions(`${this.item.item_name} has been added to the cart. You can checkout later. `)
    // this.router.navigateByUrl('/dashboard')
  }

  goBack() {
    this.router.navigateByUrl('/dashboard');
  }

}
