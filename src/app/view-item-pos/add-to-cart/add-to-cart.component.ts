import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'jv-add-to-cart',
  templateUrl: './add-to-cart.component.html',
  styleUrls: ['./add-to-cart.component.scss'],
  imports:[CommonModule,IonicModule]
})
export class AddToCartComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
