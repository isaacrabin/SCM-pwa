import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss'],
  standalone: true,
  imports: [IonicModule]
})
export class AddressComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  goToNextPage() {
    this.router.navigate(['./dashboard/address']);
  }

}
