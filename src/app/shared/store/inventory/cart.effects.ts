import { Injectable } from '@angular/core';
import { AppState } from "@capacitor/app";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ItemsService, PayloadItem } from "src/app/services/items.service";
import { ToastService } from 'src/app/services/toast.service';
import * as CartActions from './cart.actions';
import { selectCartItems } from "./cart.selector";

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private itemsSrv: ItemsService,
    private store: Store<AppState>,
    private toastSrv: ToastService
  ) { }

  checkout$ = createEffect(() => this.actions$.pipe(
    ofType(CartActions.checkout),

    tap(() => this.store.dispatch(CartActions.checkoutStart())),
    withLatestFrom(this.store.select(selectCartItems)),
    mergeMap(([action, selectedState]) => {

      const items: PayloadItem[] = selectedState.items.map(item => ({
        item_code: item.item_code,
        item_name: item.item_name,
        rate: item.standard_rate.toString(),
        qty: item.quantity.toString(),
        total_amount: (item.quantity * item.standard_rate).toString(),
      }));

      return this.itemsSrv.makeOrder(items, selectedState.totalPrice)
        .pipe(
          map(() => {
            this.store.dispatch(CartActions.checkoutComplete());
            this.toastSrv.presentToastWithOptions('Your order was placed successfully.')
            return CartActions.clearCart(); // Clear the cart after HTTP success
          }),
          catchError((error) => {
            console.error('Error during checkout:', error);
            this.store.dispatch(CartActions.checkoutComplete());
            this.toastSrv.presentToastWithOptions('Error! Could not complete placing your order.')
            return EMPTY;
          })
        );
    })
  ));
}
