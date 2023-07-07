import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Subscription } from 'rxjs';
import { DialogComponent } from '../dialog/dialog.component';
import { IShoppingDetails } from '../Models/IShoppingDetails';
import { Service } from '../Services/service';

@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent
{
  products: IShoppingDetails[] = [];
  private wishlistItemsUpdatedSubscription!: Subscription;
    showMsg!: boolean;
  constructor(private _service: Service, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit() {
    this.products = this._service.getWishlistItems();
    this.wishlistItemsUpdatedSubscription = this._service.getWishlistItemsUpdated().subscribe((wishlistItems: IShoppingDetails[]) => {
      this.products = wishlistItems;
      this.cdr.detectChanges();
    });
  }
  removeItemFromWishlist(product: IShoppingDetails) {
    this._service.removeProductFromWishlist(product);
    this.products = this._service.getWishlistItems();
    this.openDialog('Cart item deleted successfully!');
  }

  addToCart(prod: IShoppingDetails) {
    let cartItems: IShoppingDetails[] = this._service.getCartItems();
    console.log(cartItems[0].id);
    if (cartItems[0].id === prod.id) {
      this.openDialog("Product already added to the cart.");
    } else {
      this._service.addProductToCart(prod);
      this.openDialog("Product added successfully.");
      console.log("Product added:", prod);
    }
  }
  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: { message: message }
    });
  }
}
