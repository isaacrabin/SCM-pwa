import { AsyncPipe, CommonModule, JsonPipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule, MenuController, ModalController, PopoverController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable,  combineLatest, map, switchMap } from 'rxjs';
import { BarcodeScannerComponent } from 'src/app/barcode-scanner/barcode-scanner.component';
import { ItemsService } from 'src/app/services/items.service';
import { PosService } from 'src/app/services/pos.service';
import { PosProduct } from 'src/app/shared/interfaces/get-pos-products';
import { AppState } from 'src/app/shared/interfaces/states.interface';
import { PosCartItem } from 'src/app/shared/store/pos/pos-cart.model';
import * as PosCartActions from '../../shared/store/pos/pos-cart.actions';
import * as PosCartSelectors from '../../shared/store/pos/pos-cart.selector';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';
import { SelectPopoverComponent } from '../select-popover/select-popover.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastService } from 'src/app/services/toast.service';


@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor, AsyncPipe, NgIf, JsonPipe, UserInfoComponent,CommonModule, FormsModule,ReactiveFormsModule]
})
export class PosHomeComponent implements OnInit {


  private router = inject(Router);

  products$ = this.posService.fetchPosProducts();
  cartItems$ = this.store.select(PosCartSelectors.selectCartItems)
    .pipe(map(res => {
      const totalItems = res.items.reduce((acc, item) => acc + item.quantity, 0);
      return {
        ...res,
        totalItems
      }
    }))

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
    private menuCtrl: MenuController,
    private toast: ToastService,
    private popoverController: PopoverController,
    private store: Store<AppState>
  ) { }

  ngOnInit() {
  }

  async openPopOver(ev: any) {
    const popover = await this.popoverController.create({
      component: SelectPopoverComponent,
      event: ev,
      translucent: false,
      componentProps: {
        title: "Bank Account",
        items: [{icon: 'cart', name: 'Bank Account'},{icon: 'cart', name: 'Bank Account'}],
      }
    });

     await popover.present();

     // Listen for onDidDismiss
     const { data } = await popover.onDidDismiss();

     if (data !== null) {
      //  this.form.patchValue({ bank: data?.selectedItem });
      //  this.dataReturned = data?.selectedItem;
      //  this.memo = this?.dataReturned + "/" + this.memo;
     }
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
      item_id: item.name,
      item_name: item.item_name,
      quantity: 1,
      price: item.price,
      item_image: item.item_image
    }
    if(item.level < 1){
      this.toast.presentToastWithOptions('Item is out of stock');
      return;
    }
    this.store.dispatch(PosCartActions.addItem({ item: cartItem }))
  }

  reduceFromCart(item: PosProduct) {
    this.store.dispatch(PosCartActions.reduceItem({ itemId: item.name }))
  }

  removeFromCart(item: PosProduct) {
    this.store.dispatch(PosCartActions.removeItem({ itemId: item.name }))
  }

  viewCart() {
    this.router.navigateByUrl('/pos/checkout')
  }

  openMenu() {
    this.menuCtrl.open();
  }

}
