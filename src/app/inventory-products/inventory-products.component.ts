import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-inventory-products',
  templateUrl: './inventory-products.component.html',
  styleUrls: ['./inventory-products.component.scss'],
  imports: [IonicModule, NgFor]
})
export class InventoryProductsComponent implements OnInit {

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]
  constructor() { }

  ngOnInit() {
  }

}
