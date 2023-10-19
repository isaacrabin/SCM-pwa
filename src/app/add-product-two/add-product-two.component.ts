import { Component, OnInit } from '@angular/core';
import { IonNav, IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-add-product-two',
  templateUrl: './add-product-two.component.html',
  styleUrls: ['./add-product-two.component.scss'],
  imports: [IonicModule]
})
export class AddProductTwoComponent implements OnInit {

  constructor(private nav: IonNav) { }

  ngOnInit() {
  }

  navigateBack() {
  }

}
