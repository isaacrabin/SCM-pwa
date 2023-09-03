import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonNav, IonicModule, ModalController } from '@ionic/angular';
import { OtpComponent } from '../otp/otp.component';

@Component({
  standalone: true,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, DatePipe]
})
export class CreateAccountComponent implements OnInit {

  level = 0;
  nextPage = OtpComponent;

  dateOfBirth!: any;

  dateOptions = {
    displayFormat: 'DD MMMM YYYY',
    // min: format(new Date(2019, 12, 12), 'yyyy-mm-dd'),
    max: new Date().toISOString(),
  };
  registerForm!: FormGroup;


  constructor(
    private nav: IonNav,
    private _fb: FormBuilder,
    private modalCtrl: ModalController
  ) { }

  ngOnInit() {
    this.initForm()
  }

  initForm() {
    this.registerForm = this._fb.group({
      dateOfBirth: ['2005-05-06T15:36:00', Validators.required],
    })
    // this.goToNextPage();
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  goToNextPage() {
    this.nav.push(this.nextPage, { level: this.level + 1 })
  }

}
