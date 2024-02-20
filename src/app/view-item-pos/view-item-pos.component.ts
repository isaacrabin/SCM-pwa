import { Component, Input, OnInit } from '@angular/core';
import { Router, RouterLink, RouterModule } from '@angular/router';
import { IonicModule, ModalController } from '@ionic/angular';
import { PosProduct } from '../shared/interfaces/get-pos-products';
import { CommonModule } from '@angular/common';
import { AddToCartComponent } from './add-to-cart/add-to-cart.component';

@Component({
  standalone: true,
  selector: 'app-view-item-pos',
  templateUrl: './view-item-pos.component.html',
  styleUrls: ['./view-item-pos.component.scss'],
  imports: [IonicModule,CommonModule,RouterLink,RouterModule]
})
export class ViewItemPosComponent implements OnInit {


  item!: PosProduct;
  paramId!: string;


  @Input()
  set id(id: string) {
    console.log('id: ', id);
    this.paramId = id;
    this.fetchOrPassed(id);
  }

  constructor(private router: Router, private modalCtrl: ModalController) { }

  ngOnInit() {
  }

  fetchOrPassed(id: string) {
    const state = this.router.getCurrentNavigation()?.extras.state as PosProduct;

    if (state) {
      console.log('yes, state??', state);
      this.item = state;
    } else {
      this.getItemDetails(id)
    }
  }

  getItemDetails(id: string) {
    console.log('have to make http call',);
  }

  async onAddtoCart(){
   const modal = await  this.modalCtrl.create({
      component: AddToCartComponent,
      breakpoints:[0.4, 0.4],
      initialBreakpoint:0.4,
      componentProps:{}
    })
    modal.present();
  }

}
