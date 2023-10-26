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
    // Logic to add item to cart

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

  on(CartActions.removeItem, (state, { itemId }) => {
    // Find the item in the cart
    const existingItemIndex = state.items.findIndex(i => i.item_code === itemId);

    if (existingItemIndex === -1) {
      // Item not found in the cart; return the state unchanged.
      return state;
    }

    // Get the item to be removed
    const itemToRemove = state.items[existingItemIndex];

    // Create a new array without the removed item
    const newItems = [
      ...state.items.slice(0, existingItemIndex),
      ...state.items.slice(existingItemIndex + 1)
    ];

    // Update the totalItems and totalPrice
    return {
      ...state,
      items: newItems,
      totalItems: state.totalItems - itemToRemove.quantity,
      totalPrice: state.totalPrice - (itemToRemove.standard_rate * itemToRemove.quantity)
    };
  }),

  on(CartActions.clearCart, state => initialCartState)
);
