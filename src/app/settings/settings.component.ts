import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() user: User;
  errorMsg = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.user = new User;
  }

  //ADDED: Overrides original user???
  updateUser(){
    var username = document.getElementById("username").valueOf();
    var email = document.getElementById("email").valueOf();
    var password = document.getElementById("password").valueOf();

    this.user.dateJoined = new Date();

    this.authService.updateUserInfo(this.user, username, email, password).subscribe(result =>{
      var data = (<any>result);

      if(data.status == 200){
        console.log("update = 200");
      } else {
        this.errorMsg = data.errorMsg;
      }

    });
  }
}
