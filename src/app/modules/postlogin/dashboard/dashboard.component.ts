import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  goToUserVerification() {
  //  this.router.navigate(['/customer-records']);
  }
  goToCallerDetails() {
    console.log("called details clicked");
  //  this.router.navigate(['/caller-details']);
  }
  goToCustomerInfo() {
    console.log("clicked");
  //  this.router.navigate(['/customer-info']);
  }

}
