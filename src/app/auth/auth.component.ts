import { Component, OnInit, Input } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { User } from '../models/user';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  // Indicates whether the user is registering or signing in
  register = false;
  errorMsg = '';

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
    this.errorMsg = '';
    if(!this.user.username){
      this.errorMsg = "Please enter a username";
    } else if(!this.user.email){
      this.errorMsg = "Please enter a valid email";
    } else if(!this.user.password){
      this.errorMsg = "Please enter a valid password";
    } else if(!this.user.country){
      this.errorMsg = "Please enter your country";
    } else {
      this.user.dateJoined = new Date();
      this.authService.registerUser(this.user).subscribe(result =>{
        var data = (<any>result);

        if(data.status == 200){
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMsg = data.errorMsg;
        }

      });
    }
  }

  loginUser(){
    if(!this.user.username){
      this.errorMsg = "Please enter your username";
    } else if(!this.user.password){
      this.errorMsg = "Please enter your password";
    } else {
      console.log("Logging in user");
      this.authService.loginUser(this.user).subscribe(result =>{
        var data = (<any>result);

        console.log("Status is " + data.status);
        
        if(data.status == 200){
          this.router.navigateByUrl('/dashboard');
        } else {
          this.errorMsg = data.errorMsg;
        }
      });
    }
  }
}
