import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css']
})
export class LandingComponent implements OnInit {
  login = false;
  signup = false;
  constructor() { }

  ngOnInit() {
  }
  onLogin(): void {
    this.login = true;
    this.signup = false;
  }
  onSignup(): void {
    this.signup = true;
    this.login = false;
  }

}
