import { AsyncPipe, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, combineLatest, map, switchMap } from 'rxjs';
import { BarcodeScannerComponent } from 'src/app/barcode-scanner/barcode-scanner.component';
import { ItemsService } from 'src/app/services/items.service';
import { PosService } from 'src/app/services/pos.service';
import { PosProduct } from 'src/app/shared/interfaces/get-pos-products';
import { AppState } from 'src/app/shared/interfaces/states.interface';
import { PosCartItem } from 'src/app/shared/store/pos/pos-cart.model';
import * as PosCartActions from '../../shared/store/pos/pos-cart.actions';
import * as PosCartSelectors from '../../shared/store/pos/pos-cart.selector';


@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor, AsyncPipe, NgIf, JsonPipe]
})
export class PosHomeComponent implements OnInit {

  private router = inject(Router);

  products$ = this.posService.fetchPosProducts()

  itemsWithQuantity$ = this.products$.pipe(
    switchMap(items =>
      combineLatest(
        items.map(item =>
          this.store.select(PosCartSelectors.selectItemQuantity(item.item_name))
            .pipe(
              map(quantity => ({
                ...item,
                quantityInCart: quantity
              })),
            )
        )
      )
    )
  );

  isInCart!: Observable<boolean>;

  constructor(
    private modalCtrl: ModalController,
    private getItemsService: ItemsService,
    private posService: PosService,
    private store: Store<AppState>
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

  addToCart(item: PosProduct) {
    const cartItem: PosCartItem = {
      item_id: item.item_id,
      item_name: item.item_name,
      quantity: 1,
      price: item.price
    }
    this.store.dispatch(PosCartActions.addItem({ item: cartItem }))
  }

  reduceFromCart(item: PosProduct) {
    this.store.dispatch(PosCartActions.reduceItem({ itemId: item.item_id }))
  }

  removeFromCart(item: PosProduct) {
    this.store.dispatch(PosCartActions.removeItem({ itemId: item.item_id }))
  }

}
