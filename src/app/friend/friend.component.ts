/*
 * The container component for url /friends 
 */

// Import required models and libraries
import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})

export class FriendComponent implements OnInit {
  friends;
  searchedUsername;
  errorMsg = '';
  friendErrMsg = '';
  successMsg = '';

  constructor(private router: Router, private authService: AuthService, private friendService: FriendService) { }

  /**
   * Authenticates, redirects if user not logged in, and loads
   * users friends if they are
   */
  ngOnInit() {
    this.errorMsg = '';
    this.successMsg = '';

    this.authService.checkAuth().subscribe(result => {
      var data = (<any>result);

      if (data.status !== 200) {
        this.router.navigateByUrl('/auth');
      } else {
        this.friendService.getFriends().subscribe(result => {    
          var data = (<any>result);

          if (data.status !== 200) {
            this.errorMsg = data.errorMsg;
          } else if (data.friends.length < 1) {
            this.errorMsg = 'You haven\'t added any friends yet! Enter a username to get started';
          } else {
            this.errorMsg = '';
            this.friends = data.friends;
          }
        });
      }
    });
  }

  /**
   * Adds searched username to friend list, and updates displayed list
   */
  addFriend(){
    this.friendErrMsg = '';
    this.successMsg = '';

    this.friendService.addFriend(this.searchedUsername).subscribe(result =>{
      var data = (<any>result);

      if (data.status === 200) {
        this.friends = data.friends;
        this.errorMsg = '';
        this.successMsg = 'Successfully added ' + this.searchedUsername;
        this.searchedUsername = '';
      } else {
        this.friendErrMsg = data.errorMsg;
      }

    });
  }

  /**
   * Route to archive component (Navigation handle)
   */  
  goToArchive(){
    this.router.navigateByUrl('/archive');
  }

  /**
   * Route to dashboard component (Navigation handle)
   */  
  goToDash(){
    this.router.navigateByUrl('/dashboard');
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
