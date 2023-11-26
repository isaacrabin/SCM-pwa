import { HttpClient } from "@angular/common/http";
import { Injectable, inject } from "@angular/core";
import { environment } from "src/environments/environment";
import { PosProduct } from '../shared/interfaces/get-pos-products';

@Injectable({ providedIn: 'root' })
export class PosService {
  private http = inject(HttpClient)

  constructor() { }

  fetchPosProducts() {
    return this.http.get<PosProduct[]>(environment.BASE_URL + 'products');
  }
}
