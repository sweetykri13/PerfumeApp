import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, NgForm } from '@angular/forms';
import { Service } from '../Services/service';

@Component({
  selector: 'app-reviews',
  templateUrl: './reviews.component.html',
  styleUrls: ['./reviews.component.css']
})
export class ReviewsComponent {
  showRating: boolean = false;
  rating: number = 0;
  reviewForm!: FormGroup;
    reviewStatus: string='';

  constructor(private _service: Service, private _formBuilder: FormBuilder) { }
  toggleRating() {
    this.showRating = !this.showRating;
  }
  data() {
    return {
      value: null
    }
  }
  ngOnInit() {
    this.reviewForm = this._formBuilder.group(
      {
        firstname: new FormControl(),
        lastname: new FormControl(),
        emailId: new FormControl(),
        phone: new FormControl(),
        reviewmessage: new FormControl(),
        yesOrno: new FormControl(),
        rating: new FormControl()
      }
    )
  
  }
  addReview() {
    if (this.reviewForm.valid) {
      const { firstname, lastname, emailId, phone, reviewmessage, yesOrno, rating } = this.reviewForm.value;
      this._service.AddReview(firstname, lastname, emailId, phone, reviewmessage, yesOrno, rating).subscribe(
        res => {
          if (res) {
            this.reviewStatus = 'Your details added successful.';
          }
          else {
            this.reviewStatus = 'Your details not added successful failed. Please try again.';
          }
        },
        error => {
          this.reviewStatus = 'An error occurred.';
        }
      );
    }
    else {
      this.reviewStatus = 'Please fill in all the required fields.';
    }
  }
}
