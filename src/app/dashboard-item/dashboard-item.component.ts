import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  imports: [IonicModule],
  standalone: true
})
export class DashboardItemComponent implements OnInit {

  @Input() image!: string;
  @Output() more: EventEmitter<null> = new EventEmitter()

  constructor() { }

  ngOnInit() {
  }

  moreClicked() {
    this.more.emit();
  }

}
