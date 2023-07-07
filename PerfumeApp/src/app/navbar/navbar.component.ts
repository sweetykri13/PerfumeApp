import { Component, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { Router } from '@angular/router';
import { Service } from '../Services/service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements AfterViewInit {
  activeButton: string | undefined;
    loggedIn: boolean | undefined;

  constructor(private router: Router, private _service: Service, private cdr: ChangeDetectorRef) { }

  ngAfterViewInit() {
    const currentRoute = this.router.url.substring(1);
    this.activeButton = currentRoute;
    this.cdr.detectChanges();
  }

  navigateTo(route: string) {
    this.activeButton = route;
    this.router.navigate([route]);
  }

  isActive(route: string) {
    return this.activeButton === route;
  }
  onLogout() {
    this._service.logout();
    this.router.navigate(['/login']);
  }
  }
