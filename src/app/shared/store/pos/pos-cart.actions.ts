import { createAction, props } from "@ngrx/store";
import { PosCartItem } from "./pos-cart.model";

export const addItem = createAction('[POS Cart] Add POS item', props<{ item: PosCartItem }>());
