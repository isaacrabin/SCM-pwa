import { createAction, props } from "@ngrx/store";
import { PosCartItem } from "./pos-cart.model";

export const addItem = createAction('[POS Cart] Add POS item', props<{ item: PosCartItem }>());
export const reduceItem = createAction('[POS Cart] Reduce POS item', props<{ itemId: string }>());
export const removeItem = createAction('[POS Cart] Remove POS item', props<{ itemId: string }>());
export const clearCart = createAction('[Cart] Clear POS Cart');
export const checkout = createAction('[Cart] POS Checkout');
export const checkoutStart = createAction('[Cart] POS Checkout Start');
export const checkoutComplete = createAction('[Cart] POS Checkout Complete');
