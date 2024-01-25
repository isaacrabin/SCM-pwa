import { NgFor, NgIf } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActionSheetController, IonicModule } from '@ionic/angular';
import { GetItemsResults } from '../shared/interfaces/get-items.interface';
import { Router } from '@angular/router';
import { ToastService } from '../services/toast.service';

@Component({
  selector: 'app-dashboard-item',
  templateUrl: './dashboard-item.component.html',
  styleUrls: ['./dashboard-item.component.scss'],
  imports: [IonicModule, NgIf, NgFor],
  standalone: true
})
export class DashboardItemComponent implements OnInit {

  @Input() item!: GetItemsResults ;
  @Output() more: EventEmitter<null> = new EventEmitter()

  isModalOpen: boolean = false;
  selectedItem: string = "";
  isLoading: boolean = false;

  constructor(
    private actionSheetCtrl: ActionSheetController,
    private router: Router,
    private toastSrv: ToastService,
  ) { }

  ngOnInit() {
  }

  moreClicked() {
    this.more.emit();
  }


  async presentActionSheet() {
    const actionSheet = await this.actionSheetCtrl.create({
      // header: 'Actions',
      buttons: [
        {
          text: 'More Details',
          data: {
            action: 'share',
          },
          handler: () => {
          this.viewItem(this.item);
            // console.log('Delete clicked',this.item);
            // Implement your "Delete" logic here
          },
        },
        {
          text: 'Delete',
          role: 'destructive',
          data: {
            action: 'delete',
          },
          handler: () => {
            this.openModal(this.item.name);            // this.more.emit();

            console.log('Delete clicked');
            // Implement your "Delete" logic here
          },
        },
        // {
        //   text: 'Cancel',
        //   role: 'cancel',
        //   data: {
        //     action: 'cancel',
        //   },
        // },
      ],
    });

    await actionSheet.present();
  }

  viewItem(item: GetItemsResults) {
    this.router.navigateByUrl(`/dashboard/item/${item.item_name}`, {
      state: item
    })

  }
  openModal(productName: string){
    this.selectedItem = productName.split('-').join(' ');
    this.isModalOpen = true;
  }

  closeModal() {
    this.isModalOpen = false;
  }

  deleteItem(){
    this.isLoading = true;
    setTimeout(() => {
      this.toastSrv.presentToastWithOptions('Item removed successfully');
      this.closeModal();
      this.isLoading = false;
    },2000);
  }


}
