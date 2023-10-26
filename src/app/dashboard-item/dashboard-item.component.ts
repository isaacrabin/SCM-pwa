import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  imports: [IonicModule, NgIf, NgFor],
  standalone: true
})
export class DashboardItemComponent implements OnInit {

  @Input() item!: GetItemsResults | Partial<GetItemsResults>;
  @Output() more: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  moreClicked() {
    this.more.emit();
  }

}
