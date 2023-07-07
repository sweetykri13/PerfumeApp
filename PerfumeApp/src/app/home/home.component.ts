import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DialogComponent } from '../dialog/dialog.component';
import { IShoppingDetails } from '../Models/IShoppingDetails';
import { Service } from '../Services/service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  products: IShoppingDetails[] = [];
  showMsg!: boolean;
  subscribeForm!: FormGroup;
  subscribeStatus: string = '';
  isWishlistActive: boolean = false;

  constructor(private _service: Service, private _formBuilder: FormBuilder, private router: Router, private dialog: MatDialog) { }
  ngOnInit() {
    this.subscribeForm = this._formBuilder.group({
      emailId: ['', [Validators.required, Validators.email]]
    })
    this.getProduct();
  }
  subscribe() {
    if (this.subscribeForm.valid) {
      const { emailId } = this.subscribeForm.value;
      this._service.subscribe(emailId).subscribe(
        res => {
          if (res) {
            this.subscribeStatus = 'User subscription successful.';           
          }
          else {
            this.subscribeStatus = 'User subscription failed. Please try again.';
          }
        },
        error => {
          this.subscribeStatus = 'An error occurred during user subscription.';
        } );
    }
    else {
      this.subscribeStatus = 'Please fill in all the required fields.';
    }
  }
  toggleWishlist(prod: IShoppingDetails) {
    prod.isWishlistActive = !prod.isWishlistActive;
  }
  getProduct() {
    this._service.GetShopingDetails().subscribe({
      next: (data: IShoppingDetails[]) => {
        this.products = data;
        if (this.products == null) {
          this.showMsg = true;
        }
      },
      error: (error: any) => {
        console.log(error);
      }
    });
  }
  addToCart(prod: IShoppingDetails) {
    let cartItems: IShoppingDetails[] = this._service.getCartItems();
    if (cartItems[0].id === prod.id) {
      this.openDialog("Product already exist.");     
    } else {
      this._service.addProductToCart(prod);
      this.openDialog("Product added successfully.");
    }
  }

  addToWishlist(prod: IShoppingDetails) {
    let wishlistItems: IShoppingDetails[] = this._service.getWishlistItems();
    if (wishlistItems[0].id === prod.id) {
      this.openDialog("Product already exist.");
    } else {
      this._service.addProductToWishlist(prod);
      this.openDialog("Product added successfully.");
    }
  }
  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: { message: message }
    });
  }
 }
