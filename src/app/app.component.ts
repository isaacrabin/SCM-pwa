import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { register } from 'swiper/element/bundle';
import { SplashScreenComponent } from './splash-screen/splash-screen.component';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: true,
  imports: [IonicModule, RouterLink, RouterLinkActive, CommonModule, SplashScreenComponent],
})
export class AppComponent {
  public posPages = [
    { title: 'Home', url: '/home/', icon: 'home' },
    { title: 'POS', url: '/pos', icon: 'cart' },
    { title: 'Cart', url: '/pos/checkout', icon: 'cart' },
    { title: 'Sales', url: '/pos/sales', icon: 'cash' },
  ];
  public labels = ['Family', 'Friends', 'Notes', 'Work', 'Travel', 'Reminders'];

  dashboardPages = [
    { title: 'Inventory', url: '/dashboard/', icon: 'home' },
    { title: 'Restock', url: '/dashboard/restock', icon: 'bar-chart' },
  ]

  constructor() {
    register();
  }
}
