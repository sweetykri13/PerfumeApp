import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, map, Observable, Subject, throwError } from 'rxjs';
import { IOption } from '../Models/IOption';
import { IShoppingDetails } from '../Models/IShoppingDetails';

@Injectable({
  providedIn: 'root'
})
export class Service {
  private apiUrl = 'https://localhost:7088/api/Perfume/GetUserDetails';
  private loggedIn = false;
  option: IOption[] = [];
  shopingDetails: IShoppingDetails[] = [];
  cartItems: IShoppingDetails[] = [];
  private cartItemsKey = 'cartItems';
  wishlistItems: IShoppingDetails[] = [];
  private wishlistItemsKey = 'wishlistItemsKey';
  private wishlistItemsUpdated = new Subject<IShoppingDetails[]>();

  constructor(private http: HttpClient) { }

  login(email: string, password: string) {
    const url = `${this.apiUrl}?email=${email}&password=${password}`;

    return this.http.get<boolean>(url).pipe(
      map((result: boolean) => {
        if (result) {
          this.loggedIn = true;
        } else {
          this.loggedIn = false;
        }
        return result;
      })
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<never> {
    console.error('An error occurred:', error);
    return throwError('Something went wrong. Please try again later.');
  }

  setLoggedIn(value: boolean) {
    this.loggedIn = value;
  }

  logout() {
    this.setLoggedIn(false);
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }
  register(firstname: string, lastname: string, emailId: string, phone: string, password: string, confirmPassword: string): Observable<boolean> {
    const url = `https://localhost:7088/api/Perfume/AddUser?firstname=${firstname}&lastname=${lastname}&emailId=${emailId}&phone=${phone}&password=${password}&confirmPassword=${confirmPassword}`;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler))
  }
  subscribe(emailId: string): Observable<boolean> {
    const url = `https://localhost:7088/api/Perfume/AddSubscribe?emailId=${emailId}`;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler))
  }
  contact(name: string, emailId: string, phone: string, address: string, subject: string, message: string): Observable<boolean> {
    const url = `https://localhost:7088/api/Perfume/AddContact?name=${name}&emailId=${emailId}&phone=${phone}&address=${address}&subject=${subject}&message=${message}`;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
  ChooseAnOption(): Observable<IOption[]> {
    let temp = this.http.get<IOption[]>('https://localhost:7088/api/Perfume/GetChoseAnOption');
    return temp;
  }
  ContactSupport(firstname: string, lastname: string, emailId: string, phone: string, option: string, description: string): Observable<boolean> {
    const url = `https://localhost:7088/api/Perfume/AddContactSupport?firstname=${firstname}&lastname=${lastname}&emailId=${emailId}&phone=${phone}&option=${option}&description=${description}`;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
  AddReview(firstname: string, lastname: string, emailId: string, phone: string, reviewmessage: string, yesOrno: string, rating: string): Observable<boolean> {
    const url = `https://localhost:7088/api/Perfume/AddReview?firstname=${firstname}&lastname=${lastname}&emailId=${emailId}&phone=${phone}&reviewmessage=${reviewmessage}&yesOrno=${yesOrno}&rating=${rating}`;
    return this.http.post<boolean>(url, {}).pipe(catchError(this.errorHandler));
  }
  GetShopingDetails(): Observable<IShoppingDetails[]> {
    let temp = this.http.get<IShoppingDetails[]>('https://localhost:7088/api/Perfume/GetShoppingDetail');
    return temp;
  }

  //addProductToCart(product: IShoppingDetails) {
  //  let cartItems: IShoppingDetails[] = this.getCartItems();
  //  cartItems.push(product);
  //  localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
  //}

  addProductToCart(product: IShoppingDetails) {
    let cartItems: IShoppingDetails[] = this.getCartItems();
    const existingCartItem = cartItems.find(item => item.id === product.id);

    if (existingCartItem) {
      existingCartItem.quantity += product.quantity;
    } else {
      cartItems.push(product);
    }

    localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
  }

  getWishlistItems(): IShoppingDetails[] {
    let wishlistItems: IShoppingDetails[] = JSON.parse(localStorage.getItem(this.wishlistItemsKey) || '[]');
    return wishlistItems;
  }
  getCartItemById(itemId: number): IShoppingDetails | undefined {
    return this.cartItems.find((item) => item.id === itemId);
  }
  getCartItems(): IShoppingDetails[] {
    let cartItems: IShoppingDetails[] = JSON.parse(localStorage.getItem(this.cartItemsKey) || '[]');
    return cartItems;
  }
  getWishlistItemsUpdated(): Observable<IShoppingDetails[]> {
    return this.wishlistItemsUpdated.asObservable();
  }
  addProductToWishlist(product: IShoppingDetails) {
    let wishlistItems: IShoppingDetails[] = this.getWishlistItems();
    wishlistItems.push(product);
    localStorage.setItem(this.wishlistItemsKey, JSON.stringify(wishlistItems));
    this.wishlistItemsUpdated.next(wishlistItems);
  }
  removeProductFromWishlist(product: IShoppingDetails) {
    let wishlistItems: IShoppingDetails[] = this.getWishlistItems();
    const index = wishlistItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      wishlistItems.splice(index, 1);
      localStorage.setItem(this.wishlistItemsKey, JSON.stringify(wishlistItems));
    }
  }
  removeProductFromCart(product: IShoppingDetails) {
    let cartItems: IShoppingDetails[] = this.getCartItems();
    const index = cartItems.findIndex(item => item.id === product.id);
    if (index !== -1) {
      cartItems.splice(index, 1);
      localStorage.setItem(this.cartItemsKey, JSON.stringify(cartItems));
    }
  }
  }

