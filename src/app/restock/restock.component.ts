import { Component, OnInit } from '@angular/core';
import { IonNav, IonicModule } from '@ionic/angular';
import { RestockCartComponent } from '../restock-cart/restock-cart.component';

@Component({
  selector: 'app-restock',
  templateUrl: './restock.component.html',
  styleUrls: ['./restock.component.css'],
  standalone: true,
  imports: [IonicModule]
})
export class RestockComponent implements OnInit {

  constructor(private nav: IonNav) { }

  ngOnInit() {
  }

  nextPage = RestockCartComponent;

  goToNextPage() {
    this.nav.push(this.nextPage);
  }

}
