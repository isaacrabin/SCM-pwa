import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { DashboardItemComponent } from '../dashboard-item/dashboard-item.component';

@Component({
  standalone: true,
  selector: 'app-restock-cart',
  templateUrl: './restock-cart.component.html',
  styleUrls: ['./restock-cart.component.scss'],
  imports: [IonicModule, NgFor, DashboardItemComponent]
})
export class RestockCartComponent implements OnInit {

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToNextPage() {
    this.router.navigate(['./address']);
  }

}
