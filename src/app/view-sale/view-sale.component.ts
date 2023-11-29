import { DatePipe, DecimalPipe, NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Item, Sale } from '../shared/interfaces/sale.interface';

@Component({
  standalone: true,
  selector: 'app-view-sale',
  templateUrl: './view-sale.component.html',
  styleUrls: ['./view-sale.component.scss', '../restock-cart/restock-cart.component.scss'],
  imports: [IonicModule, DecimalPipe, NgFor, DatePipe]
})
export class ViewSaleComponent implements OnInit {

  private router = inject(Router);
  sale!: Sale;

  constructor() { }

  ngOnInit() {
    this.fetchOrPassed()
  }

  fetchOrPassed() {
    const state = this.router.getCurrentNavigation()?.extras.state as Sale;

    if (state) {
      console.log('yes, state??', state);
      this.sale = state;
    } else {
      this.router.navigateByUrl(`/pos/sales/`)
    }
  }

  viewProduct(item: Item) {
    this.router.navigateByUrl(`/pos/item/${item.item_name}`)
  }

}
