import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { map } from 'rxjs';
import { BarcodeScannerComponent } from 'src/app/barcode-scanner/barcode-scanner.component';
import { ItemsService } from 'src/app/services/items.service';


@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor, AsyncPipe, NgIf]
})
export class PosHomeComponent implements OnInit {

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

  constructor(
    private modalCtrl: ModalController,
    private getItemsService: ItemsService
  ) { }

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]

  ngOnInit() {
  }

  async scanCode() {
    const modal = await this.modalCtrl.create({
      component: BarcodeScannerComponent,
    })

    return modal.present();
  }

}
