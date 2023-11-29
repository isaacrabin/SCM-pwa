import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PosService } from '../services/pos.service';
import { Sale } from '../shared/interfaces/sale.interface';

@Component({
  standalone: true,
  selector: 'app-sales',
  templateUrl: './sales.component.html',
  styleUrls: ['./sales.component.scss'],
  imports: [IonicModule, NgIf, NgFor, AsyncPipe, DatePipe, RouterModule],
  providers: [PosService]
})
export class SalesComponent implements OnInit {

  posService = inject(PosService);
  private router = inject(Router);

  sales$ = this.posService.fetchAllSales()

  constructor() { }

  ngOnInit() {
  }

  viewSale(sale: Sale) {
    this.router.navigateByUrl(`/pos/sales/${sale.name}`, {
      state: sale
    })
  }

}
