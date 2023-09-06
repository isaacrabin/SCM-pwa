import { NgFor } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-pos-home',
  templateUrl: './pos-home.component.html',
  styleUrls: ['./pos-home.component.scss'],
  imports: [IonicModule, NgFor]
})
export class PosHomeComponent implements OnInit {

  constructor() { }

  images = [
    'yellow-phone',
    'smart-phone',
    'watch',
    'macbook',
  ]

  ngOnInit() {
  }

}
