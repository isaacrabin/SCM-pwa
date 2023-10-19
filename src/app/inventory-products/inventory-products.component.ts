import { NgFor } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AddProductOneComponent } from '../add-product-one/add-product-one.component';
import { BaseModalComponent } from '../base-modal/base-modal.component';

@Component({
  standalone: true,
  selector: 'app-inventory-products',
  templateUrl: './inventory-products.component.html',
  styleUrls: ['./inventory-products.component.scss'],
  imports: [IonicModule, NgFor]
})
export class InventoryProductsComponent implements OnInit {

  modalController = inject(ModalController)

  selectedItem!: string;


  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]
  constructor() { }

  ngOnInit() {
  }

  isModalOpen: boolean = false;

  openModal(productName: string) {
    this.selectedItem = productName.split('-').join(' ');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  async addItem() {
    const modal = this.modalController.create({
      component: BaseModalComponent,
      componentProps: {
        rootPage: AddProductOneComponent
      }
    });
    return (await modal).present();
  }
}
