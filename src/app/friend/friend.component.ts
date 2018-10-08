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

  constructor(private router: Router, private authService: AuthService, private friendService: FriendService) { }

  ngOnInit() {
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
          this.friends = data.friends;
    
          console.log("Friends are " + this.friends);
        });
      }
    });
  }

  addFriend(){
    this.friendService.addFriend(this.searchedUsername).subscribe(result =>{
      console.log(result);

      var data = (<any>result);
      this.friends = data.friends;

      console.log("Friends are " + this.friends);
    });
  }

  goToArchive(){
    this.router.navigateByUrl('/archive');
  }

  goToDash(){
    this.router.navigateByUrl('/dashboard');
  }

  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
