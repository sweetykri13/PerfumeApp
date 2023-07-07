import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Service } from '../Services/service';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css']
})
export class SignUpComponent {
  registerForm!: FormGroup;
  registrationStatus: string = '';
  constructor(private _service: Service, private formBuilder: FormBuilder, private router: Router) { }
  ngOnInit() {
    this.registerForm = this.formBuilder.group({
        firstName: ['', [Validators.required]],
        lastName: ['', [Validators.required]],
        emailId: ['', [Validators.required, Validators.email]], // Corrected validators array
        phone: ['', [Validators.required]],
        password: ['', [Validators.required]],
        confirmPassword: ['', [Validators.required]],
      });
    }
  SignUp() {
    if (this.registerForm.valid) {
      const { firstName, lastName, emailId, phone, password, confirmPassword } = this.registerForm.value;
      this._service.register(firstName, lastName, emailId, phone, password, confirmPassword).subscribe(
        res => {
          if (res) {
            this.registrationStatus == 'User registration successful.';
            this.router.navigate(['/login']);
          }
          else {
            this.registrationStatus = 'User registration failed. Please try again.';
          }
        },
        error => {
          this.registrationStatus = 'An error occurred during user registration.';
        }
      );
    }
    else {
      this.registrationStatus = 'Please fill in all the required fields.';
    }
  }
}
