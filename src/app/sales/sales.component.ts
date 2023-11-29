import { AsyncPipe, DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { PosService } from '../services/pos.service';

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

  sales$ = this.posService.fetchPosProducts()

  constructor() { }

  ngOnInit() {
  }

}
