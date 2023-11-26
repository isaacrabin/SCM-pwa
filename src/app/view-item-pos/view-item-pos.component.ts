import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PosProduct } from '../shared/interfaces/get-pos-products';

@Component({
  standalone: true,
  selector: 'app-view-item-pos',
  templateUrl: './view-item-pos.component.html',
  styleUrls: ['./view-item-pos.component.scss'],
  imports: [IonicModule]
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

  constructor(private router: Router) { }

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


}
