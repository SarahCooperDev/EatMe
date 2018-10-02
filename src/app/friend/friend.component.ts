import { Component, OnInit } from '@angular/core';
import { FriendService } from '../services/friend.service';

@Component({
  selector: 'app-friend',
  templateUrl: './friend.component.html',
  styleUrls: ['./friend.component.css']
})
export class FriendComponent implements OnInit {
  friends;
  searchedUsername;

  constructor(private friendService: FriendService) { }

  ngOnInit() {
    this.friendService.getFriends().subscribe(result => {
      console.log(result);

      var data = (<any>result);
      this.friends = data.friends;

      console.log("Friends are " + this.friends);
    });
  }

  addFriend(){
    this.friendService.addFriend(this.searchedUsername).subscribe(result =>{
      console.log(result);
    });
  }

}
