import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { PosService } from 'src/app/services/pos.service';
import { UserInfoComponent } from 'src/app/shared/components/user-info/user-info.component';

type Delivery = {
  from: string;
  to: string;
  status: string;
  price: string;
  name: string;
  id: string;
}

@Component({
  standalone: true,
  selector: 'jv-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss'],
  imports:[IonicModule,CommonModule,UserInfoComponent]
})
export class OrdersComponent  implements OnInit {

  sales$ = this.posService.fetchAllOrders();

  orders: any[] = [];
  deleiveries: any[] = [];
  constructor(
    private menuCtrl: MenuController,
    private posService: PosService,
  ) {
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

  ngOnInit(

  ) {
    console.log(this.sales$)
    this.getAllOrders();
  }

  openMenu() {
    this.menuCtrl.open();
  }

  getAllOrders(){
    this.posService.fetchAllOrders().subscribe({
      next:(res) =>{
        this.orders = res;
        console.log(this.orders);
      },
      error:(err) =>{}
    })
  }

}
