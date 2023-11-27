import { createReducer, on } from "@ngrx/store";
import * as PosCartActions from './pos-cart.actions';
import { PosCartItem, PosCartState } from "./pos-cart.model";

export const initialPosCartState: PosCartState = {
  date: (new Date()).toISOString(),
  customer_id: '',
  amount: 0,
  items: [],
  isCheckingOut: false
}

export const PosCartReducer = createReducer(
  initialPosCartState,

  on(PosCartActions.addItem, (state, { item }) => {

    // Check if the item is already in the cart
    const existingItemIndex = state.items.findIndex(i => i.item_id === item.item_id);

    let newItems;

    if (existingItemIndex > -1) {
      // Item exists, so we need to update its quantity
      const existingItem = state.items[existingItemIndex];
      const updatedItem: PosCartItem = {
        ...existingItem,
        quantity: existingItem.quantity + item.quantity
      };

      newItems = [
        ...state.items.slice(0, existingItemIndex),
        updatedItem,
        ...state.items.slice(existingItemIndex + 1)
      ];
    } else {
      // Item doesn't exist in cart, add it
      newItems = [...state.items, item];
    }

    return {
      ...state,
      items: newItems,
      amount: state.amount + (item.price * item.quantity)
    }
  })
)
