import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-landing',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  login = false;
  signup = false;
  dashShowing = true;

  constructor(private router: Router) {
    console.log("CONSTRUCTOR");
    if(this.router.url == '/dashboard'){
      console.log("DASH IF ON");
    }
  }

  ngOnInit() {
    console.log("URL: " + this.router.url);

  }
  onLogin(): void {
    if(this.router.url == "/dashboard"){
      console.log("WORKS");
    }
    else {
      this.login = true;
      this.signup = false;
    }
  }
  onSignup(): void {
    if(this.router.url == "/dashboard"){
      console.log("WORKS");
    }
    else {
      this.signup = true;
      this.login = false;
    }
  }
  justDash(): void {
    if(this.router.url == "/dashboard"){
      this.login = false;
      this.signup = false;
      this.dashShowing = false;
    }
  }

}
