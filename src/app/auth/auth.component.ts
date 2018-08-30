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

  //Set user registered as false.
  register = false;
  @Input() user: User;

  constructor(private authService: AuthService, private router: Router ) { }

  // tasks to perform when component initialises.
  ngOnInit() {
    this.user = new User();
  }

  // toggle the register value
  toggleRegister(){
    if(this.register == true){
      this.register = false;
    } else {
      this.register = true;
    }
  }

  // code to register the user.
  registerUser(){
    var user = new User();
    user.email = "tracer@overwatch";
    user.password = "tracer";
    user.username = "tracer";
    user.dateJoined = new Date();
    user.country = "Britain";

    this.authService.registerUser(this.user);
    this.router.navigateByUrl('/dashboard');
  }
}
