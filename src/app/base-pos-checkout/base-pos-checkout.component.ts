import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { PosCheckoutComponent } from '../pos-checkout/pos-checkout.component';

@Component({
  selector: 'app-base-pos-checkout',
  templateUrl: './base-pos-checkout.component.html',
  styleUrls: ['./base-pos-checkout.component.css'],
  standalone: true,
  imports: [IonicModule]
})
export class BasePosCheckoutComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nextPage = PosCheckoutComponent;

}
