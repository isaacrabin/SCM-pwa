import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RestockCartComponent } from '../restock-cart/restock-cart.component';

@Component({
  selector: 'app-base-restock',
  templateUrl: './base-restock.component.html',
  styleUrls: ['./base-restock.component.css'],
  standalone: true,
  imports: [IonicModule]
})
export class BaseRestockComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  nextPage = RestockCartComponent;

}
