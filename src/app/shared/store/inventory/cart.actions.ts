import { createAction, props } from '@ngrx/store';
import { CartItem } from './cart.model';

export const addItem = createAction('[Cart] Add Item', props<{ item: CartItem }>());
export const reduceItem = createAction('[Cart] Reduce Item', props<{ itemName: string }>());
export const removeItem = createAction('[Cart] Remove Item', props<{ itemName: string }>());
export const clearCart = createAction('[Cart] Clear Cart');
export const checkout = createAction('[Cart] Checkout');
export const checkoutStart = createAction('[Cart] Checkout Start');
export const checkoutComplete = createAction('[Cart] Checkout Complete');

