import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';
import { AuthService } from '../services/auth.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() user: User;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit() {
    this.user = new User;
  }

  updateUser(){
    var password = document.getElementById("password").valueOf();

    this.user.dateJoined = new Date();

    this.authService.updateUserInfo(this.user, password).subscribe(result =>{
      var data = (<any>result);

      if(data.status == 200){
        console.log("update = 200");
        alert("Password updated!");
      } else {
        this.errorMsg = data.errorMsg;
         alert(this.errorMsg);
      }
    });
  }

  /**
   * route to dashboard component
   */  
  goToDash(){
    this.router.navigateByUrl('/dashboard');
  }

  /**
   * route to friends component
   */  
  goToFriends(){
    this.router.navigateByUrl('/friends');
  }

  /**
   * route to menu component
   */  
  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

  /**
   * logout user and route to auth component
   */
  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
