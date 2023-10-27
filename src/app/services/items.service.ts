import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient)

  constructor() { }

  fetchAllItems() {
    return this.http.get<GetItemsResults[]>(environment.BASE_URL + 'viewitems')
  }

  makeOrder(order: PayloadItem[], total_amount: number): Observable<{ message: string }> {

    const payload: MakeOrderPayload = {
      items: order,
      cart: {
        delivery: "Pickup",
        total_qty: "6",
        total_amount: total_amount.toString()
      }
    }
    return this.http.post<{ message: string }>(environment.BASE_URL + 'makeorder', payload);
  }


}


export interface MakeOrderPayload {
  cart: PayloadCart;
  items: PayloadItem[];
}

export interface PayloadCart {
  delivery: string;
  total_qty: string;
  total_amount: string;
}

export interface PayloadItem {
  item_code: string;
  item_name: string;
  rate: string;
  qty: string;
  total_amount: string;
}
