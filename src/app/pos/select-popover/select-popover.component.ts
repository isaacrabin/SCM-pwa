import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { IonicModule, PopoverController } from '@ionic/angular';
import { PosService } from 'src/app/services/pos.service';
import { FilterPipe } from 'src/app/shared/pipes/filter.pipe';

type Product = {
  name:string;
  icon:string;
}

@Component({
  selector: 'jv-select-popover',
  templateUrl: './select-popover.component.html',
  styleUrls: ['./select-popover.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, NgFor],
  providers:[FilterPipe],

})
export class SelectPopoverComponent  implements OnInit {

  @Input() title: string = ""
  @Input() items: Product[] = [];

  public searchTerm = '';

  constructor(
    private posService: PosService,
    private popoverController: PopoverController,
    ) { }

  ngOnInit() {
  }

  selectItem(item: Product) {
    this.popoverController.dismiss({
      'selectedItem': item?.name
    });
  }

}
