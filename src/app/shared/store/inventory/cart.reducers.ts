import { createReducer, on } from '@ngrx/store';
import * as CartActions from './cart.actions';
import { CartItem, CartState } from './cart.model';

export const initialCartState: CartState = {
  items: [],
  totalItems: 0,
  totalPrice: 0
};

export const cartReducer = createReducer(
  initialCartState,

  on(CartActions.addItem, (state, { item }) => {

    // Check if the item is already in the cart
    const existingItemIndex = state.items.findIndex(i => i.item_code === item.item_code);

    let newItems;

    if (existingItemIndex > -1) {
      // Item exists, so we need to update its quantity
      const existingItem = state.items[existingItemIndex];
      const updatedItem: CartItem = {
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
      totalItems: state.totalItems + item.quantity,
      totalPrice: state.totalPrice + (item.standard_rate * item.quantity)
    };
  }),

  on(CartActions.reduceItem, (state, { itemName }) => {
    const itemIndex = state.items.findIndex(item => item.item_name === itemName);
    let updatedItems = [...state.items]; // create a copy

    if (itemIndex > -1) {
      const currentItem = state.items[itemIndex];
      if (currentItem.quantity > 1) {
        // Decrement the quantity
        const updatedItem: CartItem = {
          ...currentItem,
          quantity: currentItem.quantity - 1
        };
        updatedItems[itemIndex] = updatedItem;
      } else {
        // Remove the item from the cart when its quantity reaches zero
        updatedItems = updatedItems.filter(item => item.item_name !== itemName);
      }
    }

    const updatedTotalItems = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
    const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + (item.standard_rate * item.quantity), 0);

    return {
      ...state,
      items: updatedItems,
      totalItems: updatedTotalItems,
      totalPrice: updatedTotalPrice
    };
  }),

  on(CartActions.removeItem, (state, { itemName }) => {
    const updatedItems = state.items.filter(item => item.item_name !== itemName);

    const updatedTotalItems = updatedItems.reduce((acc, item) => acc + item.quantity, 0);
    const updatedTotalPrice = updatedItems.reduce((acc, item) => acc + (item.standard_rate * item.quantity), 0);

    return {
      ...state,
      items: updatedItems,
      totalItems: updatedTotalItems,
      totalPrice: updatedTotalPrice
    };
  }),


  on(CartActions.clearCart, state => initialCartState)
);
