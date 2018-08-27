import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  register = false;

  constructor(private authService: AuthService ) { }

  ngOnInit() {
  }

  toggleRegister(){
    if(this.register == true){
      this.register = false;
    } else {
      this.register = true;
    }
  }

  registerUser(){
    var user = new User();
    user.email = "tracer@overwatch";
    user.password = "tracer";
    user.username = "tracer";
    user.dateJoined = new Date();
    user.country = "Britain";

    this.authService.registerUser(user);
  }

}
