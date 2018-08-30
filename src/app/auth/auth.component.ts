import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Indicates whether the user is registering or signing in
  register = false;

  // User object, databound to the input fields
  @Input() user: User;

  constructor(private authService: AuthService, private router: Router ) { }

  /*
   * Instantiates a new user object when the component is launched
   */
  ngOnInit() {
    this.user = new User();
  }

  /*
   *  Switches the render between registering and logging in
   */
  toggleRegister(){
    if(this.register == true){
      this.register = false;
    } else {
      this.register = true;
    }
  }

  /*
   *  Called by click, calls the service to register the user through
   *  the server API
   */
  registerUser(){
    this.user.dateJoined = new Date();
    this.authService.registerUser(this.user);
    this.router.navigateByUrl('/dashboard');
  }
}
