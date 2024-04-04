import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  red="#fff"
  constructor(private router: Router) { 

  }

  ngOnInit(): void {
  }


  goToDashboard() {
    this.router.navigate(['/dashboard']);
  }

}

