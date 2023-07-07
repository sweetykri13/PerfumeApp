import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../Services/service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';
  errorMessage: string = '';
  loggedIn: boolean = false; 

  constructor(private service: Service, private router: Router) { }

  onLogin() {
    if (this.email && this.password) {
      this.service.login(this.email, this.password).subscribe(
        (result: boolean) => {
          if (result) {
            // Successful login
            console.log('Login successful');
            // TODO: Perform any desired actions upon successful login

            // Navigate to home page
            this.router.navigate(['/home']);
          } else {
            // Failed login
            console.log('Login failed');
            // TODO: Display error message or take appropriate action for failed login
          }
        },
        (error: any) => {
          // Error occurred during login
          console.error('An error occurred during login:', error);
          // TODO: Handle the error or display an error message
        }
      );
    } else {
      this.errorMessage = 'Email Id and Password are required';
    }
    this.loggedIn = true;
  }
  onLogout() {
    // Clear user session or authentication state
    // For example, remove the stored token from local storage
    localStorage.removeItem('token');

    // Reset authentication status
    this.loggedIn = false;

    // Navigate to login page
    this.router.navigate(['/login']);
  }
}
