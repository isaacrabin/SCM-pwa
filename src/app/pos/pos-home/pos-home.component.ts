import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
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

  items$ = this.getItemsService.fetchAllItems();

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
