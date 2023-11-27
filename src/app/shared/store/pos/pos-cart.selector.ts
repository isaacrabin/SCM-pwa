import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PosCartState } from './pos-cart.model';


export const selectCartState = createFeatureSelector<PosCartState>('pos');

export const selectCartItems = createSelector(
  selectCartState,
  (cart) => cart
);

export const isItemInCart = (itemId: string) => createSelector(
  selectCartItems,
  (state: PosCartState) => {
    return !!state.items.find(item => item.item_id === itemId)
  }
);

export const selectItemQuantity = (itemName: string) => createSelector(
  selectCartItems,
  (state: PosCartState) => {
    const item = state.items.find(i => i.item_name === itemName);
    return item ? item.quantity : 0;
  }
);

export const selectIsCheckingOut = (state: PosCartState) => state.isCheckingOut;
