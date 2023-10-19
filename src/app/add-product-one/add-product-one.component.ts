import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonNav, IonicModule, ModalController } from '@ionic/angular';
import { AddProductTwoComponent } from '../add-product-two/add-product-two.component';

@Component({
  standalone: true,
  selector: 'app-add-product-one',
  templateUrl: './add-product-one.component.html',
  styleUrls: ['./add-product-one.component.scss', '../create-account/create-account.component.scss'],
  imports: [IonicModule, NgFor]
})
export class AddProductOneComponent implements OnInit {

  level = 0;
  nextPage = AddProductTwoComponent;

  constructor(
    private nav: IonNav,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.onNextPage()
  }

  checkboxes = [
    {
      value: 'Cell Phones & Accessories',
      isItemChecked: false,
    },
    {
      value: 'TVs',
      isItemChecked: false,
    }
  ]

  async onNextPage() {
    this.nav.push(this.nextPage, { level: this.level + 1 })
  }

  async closeModal() {
    await this.modalCtrl.dismiss();
  }
}
