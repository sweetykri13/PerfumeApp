import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IShoppingDetails } from '../Models/IShoppingDetails';
import { Service } from '../Services/service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.css']
})
export class ShopComponent {

  products: IShoppingDetails[] = [];
    showMsg!: boolean;

  constructor(private _service: Service, private dialog: MatDialog) {
  }
  ngOnInit() {
    this.getProduct();
  }
  getProduct() {
    this._service.GetShopingDetails().subscribe({
      next:(data: IShoppingDetails[])=>{
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


