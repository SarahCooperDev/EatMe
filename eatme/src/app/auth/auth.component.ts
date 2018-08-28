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
  register = false;
  @Input() user: User;

  constructor(private authService: AuthService, private router: Router ) { }

  ngOnInit() {
    this.user = new User();
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

    this.authService.registerUser(this.user);
    this.router.navigateByUrl('/dashboard');
  }

}
