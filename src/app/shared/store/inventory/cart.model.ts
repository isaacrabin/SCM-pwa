
export interface CartItem {
  item_code: string;
  item_name: string;
  image: string | null;
  standard_rate: number;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
}
