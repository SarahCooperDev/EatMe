/*
 * The container component for url /settings
 * 
 * Has children archive-images and image-upload
 */

// Import required models and libraries
import { Component, Input, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../services/auth.service';
import { Router } from "@angular/router";

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})

export class SettingsComponent implements OnInit {

  @Input() user: User;
  errorMsg = '';

  constructor(private authService: AuthService, private router: Router) { }

  /**
   * Initialize user object
   */
  ngOnInit() {
    this.user = new User;
  }

  /**
   * Updates the users password
   */
  updateUser(){
    var password = document.getElementById("password").valueOf();

    this.user.dateJoined = new Date();

    this.authService.updateUserInfo(this.user, password).subscribe(result =>{
      var data = (<any>result);

      if(data.status === 200){
        alert("Password updated!");
      } else {
        this.errorMsg = data.errorMsg;
        alert(this.errorMsg);
      }
    });
  }

  /**
   * Route to dashboard component (Navigation handle)
   */  
  goToDash(){
    this.router.navigateByUrl('/dashboard');
  }

  /**
   * Route to friends component (Navigation handle)
   */  
  goToFriends(){
    this.router.navigateByUrl('/friends');
  }

  /**
   * Route to menu component (Navigation handle)
   */  
  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

  /**
   * Logout user and route to auth component (Navigation handle)
   */
  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
