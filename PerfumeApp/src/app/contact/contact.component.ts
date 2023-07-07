import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { IContact } from '../Models/IContact';
import { Service } from '../Services/service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  contactForm!: FormGroup;
  contacts: IContact[] | [] = [];
  name: string | undefined;
  emailId: string | undefined;
  phone: string | undefined;
  address: string | undefined;
  subject: string | undefined;
  message: string | undefined;
  contactStatus: string ='';

  constructor(private _service: Service, private _formBuilder: FormBuilder) { }
  ngOnInit() {
    this.contactForm = new FormGroup({
      name: new FormControl(),
      emailId: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      subject: new FormControl(),
      message: new FormControl()
    });
  }
  Addcontact() {
    debugger
    if (this.contactForm.valid) {
      const { name, emailId, phone, address, subject, message } = this.contactForm.value;
    
      this._service.contact(name, emailId, phone, address, subject, message).subscribe(
        res=>{
          if (res) {
            this.contactStatus ='Your details added successful.';
          }
          else {
            this.contactStatus = 'Your details not added successful failed. Please try again.';
          }
        },
        error => {
          this.contactStatus = 'An error occurred during add contact.';
        }
      );
  }
    else {
  this.contactStatus = 'Please fill in all the required fields.';
   }
  }
}
