import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { BarcodeScannerComponent } from 'src/app/barcode-scanner/barcode-scanner.component';


@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor]
})
export class PosHomeComponent implements OnInit {

  constructor(private modalCtrl: ModalController) { }

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
