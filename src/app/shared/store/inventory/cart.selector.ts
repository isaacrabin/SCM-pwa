import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CartState } from './cart.model';


export const selectCartState = createFeatureSelector<CartState>('inventory');

export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart
);

export const isItemInCart = (itemName: string) => createSelector(
  selectCartItems,
  (state: CartState) => {
    return !!state.items.find(item => item.item_name === itemName)
  }
);

export const selectItemQuantity = (itemName: string) => createSelector(
  selectCartItems,
  (state: CartState) => {
    const item = state.items.find(i => i.item_name === itemName);
    return item ? item.quantity : 0;
  }
);
