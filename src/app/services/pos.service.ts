import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { PosProduct } from '../shared/interfaces/get-pos-products';
import { PosCartState } from "../shared/store/pos/pos-cart.model";

type PosCartCheckoutPayload = Omit<PosCartState, "isCheckingOut">;
@Injectable({ providedIn: 'root' })
export class PosService {
  private http = inject(HttpClient)

  constructor() { }

  fetchPosProducts() {
    return this.http.get<PosProduct[]>(environment.BASE_URL + 'products');
  }

  sellProducts(sellPayload: PosCartCheckoutPayload) {
    sellPayload = { ...sellPayload, date: (new Date()).toISOString() }
    return this.http.post<{ data: PosCartCheckoutPayload }>(environment.BASE_URL + 'sellproduct', sellPayload,)
  }
}
