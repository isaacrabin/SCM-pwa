import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';


export const selectCartState = createFeatureSelector<CartState>('inventory');

export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart
);
