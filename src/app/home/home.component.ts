import { NgFor, AsyncPipe, NgIf, JsonPipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { UserInfoComponent } from '../shared/components/user-info/user-info.component';
import { AppState } from '@capacitor/app';
import { Store } from '@ngrx/store';

type Service = {
  name: string;
  icon: string;
}

type Delivery = {
  from: string;
  to: string;
  status: string;
  price: string;
  name: string;
  id: string;
}

@Component({
  selector: 'jv-home',
  templateUrl: './home.component.html',
  standalone: true,
  styleUrls: ['./home.component.scss'],
  imports: [IonicModule,NgFor, AsyncPipe, NgIf, JsonPipe, UserInfoComponent],
})
export class HomeComponent  implements OnInit {

  myServices: Service[] = [];
  deleiveries: Delivery[] = [];
  constructor(
    private menuCtrl: MenuController,
    private store: Store<AppState>
  ) {
    this.myServices = [
      {
        name:'Airtime',
       icon:'phone-portrait-outline'
      },
      {
        name:'Pay Bill',
        icon:'newspaper'
      },
      {
        name:'Buy Token',
        icon:'flash'
      },
      {
        name:'Buy Goods',
        icon:'cart'
      },
      {
        name:'Bundles',
        icon:'wifi'
      },
      {
        name:'Loans',
        icon:'card'
      }
    ];

    this.deleiveries = [
      {
        from: "Nakuru",
        to: "Kisumu",
        status: "In Transit",
        price: "102",
       name: "Kayeen Suppliers",
       id:'SD0939'
      },
      {
        from: "Mombasa",
        to: "Kisumu",
        status: "In Transit",
        price: "102",
        name: "Kayeen Suppliers",
        id:'SD0987'
      }
    ]
   }

  ngOnInit() {}

  openMenu() {
    this.menuCtrl.open();
  }
  scanCode(){}

}
