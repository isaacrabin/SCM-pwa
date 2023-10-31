import { DatePipe, NgFor, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonNav, IonicModule, ModalController } from '@ionic/angular';
import { EMPTY, catchError, finalize, map, tap } from 'rxjs';
import { OtpComponent } from '../otp/otp.component';
import { ToastService } from '../services/toast.service';
import { UserService } from '../services/user.service';
import { RegisterUserPayload } from '../shared/interfaces/register.interface';
import { MustMatch } from '../shared/validators/must-match.validator';

@Component({
  standalone: true,
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss'],
  imports: [IonicModule, FormsModule, ReactiveFormsModule, DatePipe, NgFor, NgIf],
  providers: [ToastService]
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
      { type: 'required', message: 'Date of birth is required.' },
    ],
    gender: [
      { type: 'required', message: 'Gender is required.' },
    ],
    phone_number: [
      { type: 'required', message: 'Phone number is required.' },
    ],
    company_name: [
      { type: 'required', message: 'Company name is required.' },
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
      { type: 'required', message: 'Please confirm the password.' },
      { type: 'mustMatch', message: 'password does not match .' },
    ],
  };
  loading: boolean = false;

  constructor(
    private nav: IonNav,
    private _fb: FormBuilder,
    private modalCtrl: ModalController,
    private toastSrv: ToastService,
    private userSrv: UserService
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
    console.log(this.registerForm.value);
    this.registerForm.markAllAsTouched();

    if (this.registerForm.valid) {
      this.loading = true
      // register user
      const { firstName, lastName, email, company_name, password, gender, phone_number, date_of_birth } = this.registerForm.value;
      const userDTO: RegisterUserPayload = {
        first_name: firstName,
        last_name: lastName,
        email, company_name, password, gender, phone_number, date_of_birth
      }
      this.userSrv.registerNewUser(userDTO)
        .pipe(
          tap(_ => this.loading = true),
          map(async (resp) => {
            if (resp.message === 'CREATED') {
              await this.modalCtrl.dismiss();
              this.toastSrv.presentToastWithOptions('Registration successful');
              this.registerForm.reset();
            }
          }),
          catchError(error => {
            console.log('error', error);
            this.toastSrv.presentToastWithOptions('Something went wrong. Registration failed!');
            return EMPTY
          }),
          finalize(() => {
            this.loading = false
          })
        ).subscribe()
    } else {
      // show error
      this.toastSrv.presentToastWithOptions('Please fill in all fields.');
    }
  }

  async close() {
    await this.modalCtrl.dismiss();
  }

  goToNextPage() {
    this.nav.push(this.nextPage, { level: this.level + 1 })
  }

}
