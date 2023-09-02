import { AfterContentChecked, Component, HostBinding, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';

@Component({
  standalone: true,
  selector: 'jv-splash-screen',
  templateUrl: './splash-screen.component.html',
  styleUrls: ['./splash-screen.component.scss'],
  imports: [IonicModule]
})
export class SplashScreenComponent implements AfterContentChecked {

  @Input() duration = 1;
  @Input()
  public set transitionDuration(value) {
    if (value) {
      this._transitionDuration = value;
    }
    this.transition = `${this._transitionDuration}s`;
  }
  public get transitionDuration() {
    return this._transitionDuration;
  }
  private _transitionDuration = 0.5;

  @Input()
  set image(value) {
    this._image = value.length ? value : 'https://picsum.photos/200/300';
    console.log('image: ', this._image);
    this.backgroundImage = `url(${this._image})`;
  }
  get image() {
    return this._image
  }
  private _image = ''

  @Input()
  public set logo(value) {
    this._logo = value;
  }
  public get logo() {
    return this._logo;
  }
  private _logo = '';

  @HostBinding('class.fade-out') fadeOut = false;
  @HostBinding('style.transitionDuration') transition = `${this._transitionDuration}s`;
  @HostBinding('style.backgroundImage') backgroundImage = ``;

  constructor() { }

  ngAfterContentChecked() {
    setTimeout(() => {
      this.fadeOut = true
    }, (this.duration * 1000));
  }
}
