import { NgIf } from '@angular/common';
import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AnimationController, IonicModule, ModalController } from '@ionic/angular';
import { CodeInputComponent, CodeInputModule } from 'angular-code-input';
import { AnimatedCheckmarkComponent } from '../animated-checkmark/animated-checkmark.component';

@Component({
  standalone: true,
  selector: 'app-otp',
  templateUrl: './otp.component.html',
  styleUrls: ['./otp.component.scss'],
  imports: [IonicModule, CodeInputModule, NgIf, AnimatedCheckmarkComponent]
})
export class OtpComponent implements OnInit, AfterViewInit {

  otp = 1894;
  isWrongOTP = false;

  @ViewChild('codeInput') codeInput !: CodeInputComponent;
  @ViewChild('content', { read: ElementRef }) content!: ElementRef<HTMLDivElement>;

  animation!: Animation;


  constructor(private modalCtrl: ModalController, private animationCtrl: AnimationController) { }

  ngOnInit() {
  }

  ngAfterViewInit() {
    // @ts-ignore
    this.animation = this.animationCtrl
      .create()
      .addElement(this.content.nativeElement)
      .duration(200)
      // .iterations()
      // .fromTo('transform', 'translateX(0px)', 'translateX(100px)')
      .fromTo('opacity', '1', '0')
    // .fromTo('scale', '1', '0')
  }



  onCodeChanged(event: string) {
    this.isWrongOTP = false;
    console.log('code changed: ', event);
  }

  onCodeCompleted(event: string) {
    console.log('completed: ', event);
    if (Number(event) === this.otp) {
      this.animation.play();
      return
      // this._router.navigate(['verify']);
    }

    return this.isWrongOTP = true;

  }

  async close() {
    await this.modalCtrl.dismiss();
  }

}
