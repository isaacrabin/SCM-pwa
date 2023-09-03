import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'app-base-modal',
  templateUrl: './base-modal.component.html',
  styleUrls: ['./base-modal.component.scss'],
  imports: [IonicModule]
})
export class BaseModalComponent implements OnInit {
  rootPage: any;

  constructor() { }

  ngOnInit() {
  }

}
