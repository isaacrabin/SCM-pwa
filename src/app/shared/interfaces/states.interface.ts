import { CartState } from "../store/inventory/cart.model";
import { PosCartState } from "../store/pos/pos-cart.model";


export interface AppState {
  cart: CartState;
  posCart: PosCartState
}
