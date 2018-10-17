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

  ngOnInit() {
    this.errorMsg = '';
    this.successMsg = '';
    this.authService.checkAuth().subscribe(result => {
      console.log("In subscribe");
      var data = (<any>result);

      console.log("Status is " + data.status);

      if(data.status != 200){
        this.router.navigateByUrl('/auth');
      } else {
        this.friendService.getFriends().subscribe(result => {
          console.log(result);
    
          var data = (<any>result);
          console.log("status is " + data.status);
          if(data.status !== "200"){
            this.errorMsg = data.errorMsg;
          } else if(data.friends.length < 1){
            this.errorMsg = "You haven't added any friends yet! Enter a username to get started";
          } else {
            this.errorMsg = '';
            this.friends = data.friends;
            console.log("Friends are " + this.friends);

          }
        });
      }
    });
  }

  addFriend(){
    this.friendErrMsg = '';
    this.successMsg = '';
    this.friendService.addFriend(this.searchedUsername).subscribe(result =>{
      console.log(result);

      var data = (<any>result);

      if(data.status == 200){
        this.friends = data.friends;
        this.errorMsg = '';
        this.successMsg = "Successfully added " + this.searchedUsername;
        this.searchedUsername = '';
        console.log("Friends are " + this.friends);
      } else {
        this.friendErrMsg = data.errorMsg;
      }

    });
  }

  /**
   * route to archive component
   */  
  goToArchive(){
    this.router.navigateByUrl('/archive');
  }

  /**
   * route to dashboard component
   */  
  goToDash(){
    this.router.navigateByUrl('/dashboard');
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
