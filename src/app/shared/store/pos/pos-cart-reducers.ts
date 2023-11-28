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
  }),

  on(PosCartActions.reduceItem, (state, { itemId }) => {
    const itemIndex = state.items.findIndex(item => item.item_id === itemId);
    let updatedItems = [...state.items]; // create a copy

    if (itemIndex > -1) {
      const currentItem = state.items[itemIndex];
      if (currentItem.quantity > 1) {
        // Decrement the quantity
        const updatedItem: PosCartItem = {
          ...currentItem,
          quantity: currentItem.quantity - 1
        };
        updatedItems[itemIndex] = updatedItem;
      } else {
        // Remove the item from the cart when its quantity reaches zero
        updatedItems = updatedItems.filter(item => item.item_name !== itemId);
      }
    }

    const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return {
      ...state,
      items: updatedItems,
      amount: updatedTotalPrice
    };
  }),

  on(PosCartActions.removeItem, (state, { itemId }) => {
    const updatedItems = state.items.filter(item => item.item_id !== itemId);

    const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + (item.price * item.quantity), 0);

    return {
      ...state,
      items: updatedItems,
      amount: updatedTotalPrice
    };
  }),

  on(PosCartActions.clearCart, state => initialPosCartState),

)
