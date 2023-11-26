export interface PosCartItem {
  item_id: string;
  item_name: string;
  quantity: number;
  price: number;
}

export interface Data {
  data: Data;
}

export interface PosCartState {
  date: string;
  customer_id: string;
  amount: number;
  items: PosCartItem[];
}


