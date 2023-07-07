import { ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogComponent } from '../dialog/dialog.component';
import { IShoppingDetails } from '../Models/IShoppingDetails';
import { Service } from '../Services/service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent {
  products: IShoppingDetails[] = [];
  showMsg: boolean | undefined;

  constructor(private _service: Service, private cdr: ChangeDetectorRef, private dialog: MatDialog) { }

  ngOnInit() {
    this.products = this._service.getCartItems();
    this.initializeQuantity();
  }

  increaseQuantity(product: IShoppingDetails) {
    product.quantity++;
    this.cdr.detectChanges();
  }

  initializeQuantity() {
    this.products.forEach((product) => {
      product.quantity = 1;
    });
  }

  decreaseQuantity(product: IShoppingDetails) {
    if (product.quantity > 1) {
      product.quantity--;
      this.cdr.detectChanges();
    }
  }
  calculateTotalAmount(): number {
    let total = 0;
    for (const product of this.products) {
      total += product.price * product.quantity;
    }
    return Number(total.toFixed(2));   
  }

  calculateAmount(): number {
    let total = 0;
    for (const product of this.products) {
      total += (product.price * product.quantity)-(product.price * product.quantity)*5/100;
    }
    return Number(total.toFixed(2));
  }
  removeItemFromWishlist(product: IShoppingDetails) {
    this._service.removeProductFromCart(product);   
    this.products = this._service.getCartItems();
    this.openDialog('Cart item deleted successfully!');
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
  addToWishlist(prod: IShoppingDetails) {
    if (prod != null) {
      this.openDialog("Product added successfully to your wishlist.");
      this._service.addProductToWishlist(prod);
        this._service.removeProductFromCart(prod);
        this.products = this._service.getCartItems();
    } else {
      this.openDialog("Failed to add the product to the wishlist.");
    }
  }
  openDialog(message: string): void {
    this.dialog.open(DialogComponent, {
      width: '350px',
      data: { message: message }
    });
  }
}
