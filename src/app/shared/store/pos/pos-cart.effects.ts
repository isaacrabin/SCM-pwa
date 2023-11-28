import { Injectable } from "@angular/core";
import { AppState } from "@capacitor/app";
import { Actions, createEffect, ofType } from "@ngrx/effects";
import { Store } from "@ngrx/store";
import { EMPTY, catchError, map, mergeMap, tap, withLatestFrom } from "rxjs";
import { ToastService } from "src/app/services/toast.service";
import { PosService } from './../../../services/pos.service';
import * as PosCartActions from './pos-cart.actions';
import { selectCartItems } from "./pos-cart.selector";

@Injectable()
export class PosCartEffects {
  constructor(
    private actions$: Actions,
    private posService: PosService,
    private store: Store<AppState>,
    private toastSrv: ToastService
  ) { }

  checkout$ = createEffect(() => this.actions$.pipe(
    ofType(PosCartActions.checkout),

    tap(() => this.store.dispatch(PosCartActions.checkoutStart())),
    withLatestFrom(this.store.select(selectCartItems)),
    mergeMap(([action, selectedState]) => {

      const { isCheckingOut, ...payload } = selectedState

      return this.posService.sellProducts(payload)
        .pipe(
          map(() => {
            this.store.dispatch(PosCartActions.checkoutComplete());
            this.toastSrv.presentToastWithOptions('Goods sold successfully.')
            return PosCartActions.clearCart(); // Clear the cart after HTTP success
          }),
          catchError((error) => {
            console.error('Error during checkout:', error);
            this.store.dispatch(PosCartActions.checkoutComplete());
            this.toastSrv.presentToastWithOptions('Error! Could not complete selling goods.')
            return EMPTY;
          })
        );
    })
  ));
}
