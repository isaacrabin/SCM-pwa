import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from 'src/environments/environment';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';

@Injectable({
  providedIn: 'root'
})
export class ItemsService {

  private http = inject(HttpClient)

  constructor() { }

  fetchAllItems() {
    return this.http.get<GetItemsResults>(environment.BASE_URL + 'viewitems')
  }

}
