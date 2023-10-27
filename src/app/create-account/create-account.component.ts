import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonNav, IonicModule, ModalController } from '@ionic/angular';
import { OtpComponent } from '../otp/otp.component';
import { MustMatch } from '../shared/validators/must-match.validator';

@Component({
  standalone: true,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, DatePipe, NgFor, NgIf]
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

  validations = {
    firstName: [
      { type: 'required', message: 'First name is required.' },
    ],
    lastName: [
      { type: 'required', message: 'Last name is required.' },
    ],
    date_of_birth: [
      { type: 'required', message: 'Last name is required.' },
    ],
    gender: [
      { type: 'required', message: 'Last name is required.' },
    ],
    phone_number: [
      { type: 'required', message: 'Last name is required.' },
    ],
    email: [
      { type: 'required', message: 'email is required.' },
      { type: 'exists', message: 'this email is already registered with another account.' },
      { type: 'pattern', message: 'please enter a valid password' },
    ],
    password: [
      { type: 'required', message: 'password is required' },
    ],
    confirmPassword: [
      { type: 'required', message: 'password does not match .' },
      { type: 'mustMatch', message: 'password does not match .' },
    ],
  };

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
      firstName: [null, Validators.required],
      lastName: [null, Validators.required],
      email: [null, [Validators.required, Validators.compose([Validators.required, Validators.pattern('^[^\\s@]+@[^\\s@]+\\.[^\\s@]{2,}$')])]],
      company_name: [null, Validators.required],
      password: [null, Validators.required],
      confirmPassword: [null, Validators.required],
      gender: [null, Validators.required],
      phone_number: [null, Validators.required],
      date_of_birth: [null, Validators.required],
    },
      {
        validators: [MustMatch('password', 'confirmPassword')],
      }
    )


  }

  submit() {
    console.log('form: ', this.registerForm);
    this.registerForm.markAllAsTouched();
    console.log(this.registerForm.value);
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  goToNextPage() {
    this.nav.push(this.nextPage, { level: this.level + 1 })
  }

}
