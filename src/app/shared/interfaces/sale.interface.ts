// Generated by https://quicktype.io

export interface Sale {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  date: string;
  customer_id: string;
  amount: number;
  doctype: string;
  items: Item[];
}

export interface Item {
  name: string;
  owner: string;
  creation: string;
  modified: string;
  modified_by: string;
  docstatus: number;
  idx: number;
  item_id: string;
  item_name: string;
  quantity: number;
  price: number;
  parent: string;
  parentfield: string;
  parenttype: string;
  doctype: string;
}