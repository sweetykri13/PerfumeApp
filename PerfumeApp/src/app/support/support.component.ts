import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { IContactSupport } from '../Models/IContactSupport';
import { IOption } from '../Models/IOption';
import { Service } from '../Services/service';

@Component({
  selector: 'app-support',
  templateUrl: './support.component.html',
  styleUrls: ['./support.component.css']
})
export class SupportComponent {
  option: IOption[] = [];
  contactSupport: IContactSupport[] = [];
  supportForm!: FormGroup;
    contactStatus!: string;
  constructor(private _service: Service, private formBuilder: FormBuilder) { }

  ngOnInit() {
    this.supportForm = this.formBuilder.group({
      firstName: new FormControl(),
      lastName: new FormControl(),
      emailId: new FormControl(),
      phone: new FormControl(),
      option: new FormControl(),
      description: new FormControl()

    })

    this._service.ChooseAnOption().subscribe(
      (options: IOption[]) => {
        this.option = options;
      },
      (error) => {
        console.log('Error retrieving ChoseAnOption:', error);
      }
    );
  }
  support() {
    if (this.supportForm.valid) {
      const { firstName, lastName, emailId, phone, option, description } = this.supportForm.value;
      this._service.ContactSupport(firstName, lastName, emailId, phone, option, description).subscribe(
        res =>{
        if(res) {
          this.contactStatus = 'Your details added successful.';
        }
          else {
          this.contactStatus = 'Your details not added successful failed. Please try again.';
        }
      },
        error => {
          this.contactStatus = 'An error occurred.';
        }
        );
    }
    else {
      this.contactStatus = 'Please fill in all the required fields.';
    }
      }
    }   

