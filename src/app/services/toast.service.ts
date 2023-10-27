import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';


@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(
    private toastCtrl: ToastController,
  ) { }

  /**
   *
   *
   * @param msg - mesasge to show in the toast
   * @param [position=Position.top] - position of the toast in the view
   * @param [buttonText='ok'] - text in the dismiss button
   * @param [duration=3000] - number of milliseconds the toast will display
   */
  async presentToastWithOptions(msg: string, position: 'top' | 'middle' | 'bottom' = 'top', buttonText: string = 'ok', duration: number = 3000) {
    const toast = await this.toastCtrl.create({
      message: msg,
      position,
      buttons: [
        {
          text: buttonText,
          role: 'cancel',
        }
      ],
      duration
    });
    toast.present();
  }

}
