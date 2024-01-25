import { NgIf, AsyncPipe, NgFor } from '@angular/common';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'jv-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.scss'],
  standalone: true,
  imports: [IonicModule, NgIf, AsyncPipe, NgFor],
})
export class UserInfoComponent  implements OnInit {

  @ViewChild('#modal') modal: ElementRef | any;

  constructor(
    private authService: AuthService,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {}

  moveTo(breakpoint: number) {
    const { nativeElement } = this.modal;
    if (!nativeElement) {
      return;
    }
    nativeElement.setCurrentBreakpoint(breakpoint);
  }

  cancelLogout(){
    this.modalCtrl.dismiss();

  }

  logout(){
    this.authService.logout();
    this.modalCtrl.dismiss();
  }

}
