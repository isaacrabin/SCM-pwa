import { AsyncPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { tap } from 'rxjs';
import { AddProductOneComponent } from '../add-product-one/add-product-one.component';
import { BaseModalComponent } from '../base-modal/base-modal.component';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';
import { ItemsService } from '../services/items.service';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';
import { AppState } from '../shared/interfaces/states.interface';
import { selectCartItems } from '../shared/store/inventory';
import { UserInfoComponent } from '../shared/components/user-info/user-info.component';

@Component({
  standalone: true,
  selector: 'app-inventory-products',
  templateUrl: './inventory-products.component.html',
  styleUrls: ['./inventory-products.component.scss'],
  imports: [IonicModule, NgFor, NgIf, AsyncPipe, DashboardItemComponent, UserInfoComponent]
})
export class InventoryProductsComponent implements OnInit {

  private getItemsService = inject(ItemsService)
  private router = inject(Router);
  private store = inject(Store<AppState>);

  modalController = inject(ModalController)

  selectedItem!: string;

  cartItems$ = this.store.select(selectCartItems)

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]

  items$ = this.getItemsService.fetchAllItems()
    .pipe(tap(items => console.log('items: ', items)))
  // .subscribe()

  constructor(
    private menuCtrl: MenuController
  ) { }

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

  viewItem(item: GetItemsResults) {
    this.router.navigateByUrl(`/dashboard/item/${item.item_name}`, {
      state: item
    })

  }

  viewCart() {
    this.router.navigateByUrl('/dashboard/restock')
  }

  openMenu() {
    this.menuCtrl.open();
  }

}
