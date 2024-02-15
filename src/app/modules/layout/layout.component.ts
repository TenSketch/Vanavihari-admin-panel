import { Component, HostListener, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {
  constructor(private router: Router, private userService: UserService) { }
  
  isSidebarOpen: boolean = false;


  ngOnInit(): void {
  }

  isLoggedIn(): boolean {
    return this.userService.isLoggedIn();
  }

  logout(): void {

    this.userService.logout(); // Implement this method in UserService to clear authentication state
   
    this.router.navigate(['/home']);
    alert('Logout Successfully');
  }

  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  closeSidebar() {
    this.isSidebarOpen = false;
  }

  goToHome(){
    this.router.navigate(['/home']);
  }

  goToSignin() {
    this.router.navigate(['/sign-in']);
  }

  goToAboutUs() {
    this.router.navigate(['/about-vanavihari']);
  }
  goToMyAccSettings() {
    this.router.navigate(['/my-account/settings']);
  }
  goToMyBookings() {
    this.router.navigate(['/my-account/my-bookings']);
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const targetElement = event.target as HTMLElement;
    if (!targetElement.closest('#sidebar') && !targetElement.closest('.navbar-toggler')) {
      this.closeSidebar();
    }
  }

}

