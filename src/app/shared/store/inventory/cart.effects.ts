import { Injectable } from '@angular/core';
import { AppState } from "@capacitor/app";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from "@ngrx/store";
import { EMPTY } from 'rxjs';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { ItemsService, PayloadItem } from "src/app/services/items.service";
import * as CartActions from './cart.actions';
import { selectCartItems } from "./cart.selector";

@Injectable()
export class CartEffects {

  constructor(
    private actions$: Actions,
    private itemsSrv: ItemsService,
    private store: Store<AppState>
  ) { }

  checkout$ = createEffect(() => this.actions$.pipe(
    tap(action => console.log('Action received:', action)),  // Log here
    ofType(CartActions.checkout),
    tap(() => console.log('Passed filter')),  // Log here
    withLatestFrom(this.store.select(selectCartItems)),
    tap(([action, selectedState]) => console.log('With store state:', selectedState)),  // Log here
    mergeMap(([action, selectedState]) => {

      const items: PayloadItem[] = selectedState.items.map(item => ({
        item_code: item.item_code,
        item_name: item.item_name,
        rate: item.standard_rate.toString(),
        qty: item.quantity.toString(),
        total_amount: (item.quantity * item.standard_rate).toString(),
      }));

      return this.itemsSrv.makeOrder(items, selectedState.totalPrice).pipe(
        map(() => CartActions.clearCart()), // Clear the cart after HTTP success
        catchError((error) => {
          console.error('Error during checkout:', error);
          return EMPTY;
        })
      );
    })
  ));
}
