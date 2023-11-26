import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { BarcodeScannerComponent } from 'src/app/barcode-scanner/barcode-scanner.component';
import { ItemsService } from 'src/app/services/items.service';
import { PosService } from 'src/app/services/pos.service';
import { PosProduct } from 'src/app/shared/interfaces/get-pos-products';


@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor, AsyncPipe, NgIf, JsonPipe]
})
export class PosHomeComponent implements OnInit {

  private router = inject(Router);

  items$ = this.getItemsService.fetchAllItems()
    .pipe(
      map(items => {
        items.map(item => {
          const rate = item.standard_rate.toString();
          // Ensure item['price'] is an object
          if (!item['price']) {
            item['price'] = {};
          }
          if (rate.includes('.')) {
            const split = rate.split('.');
            item['price']['whole'] = Number(split[0]);
            item['price']['cents'] = Number(split[1]);
          } else {
            item['price']['whole'] = item.standard_rate;
            item['price']['cents'] = 0o0;
          }
          return item
        })
        return items
      })
    )

  products$ = this.posService.fetchPosProducts()

  constructor(
    private modalCtrl: ModalController,
    private getItemsService: ItemsService,
    private posService: PosService
  ) { }

  ngOnInit() {
  }

  onCardClick(item: PosProduct) {
    this.router.navigateByUrl(`/pos/item/${item.item_name}`, {
      state: item
    })
  }

  async scanCode() {
    const modal = await this.modalCtrl.create({
      component: BarcodeScannerComponent,
    })
    return modal.present();
  }

}
