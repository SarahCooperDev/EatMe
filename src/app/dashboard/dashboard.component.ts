import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";

// export interface DialogData {
//   placeName: string;
//   placeLocation: string;
//   placeRating: string;
// }
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  // placeName: string;
  // placeLocation: string;
  // placeRating: string;
  username;
  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}

  ngOnInit() {
    console.log("IN INIT");

    this.authService.checkAuth().subscribe(result => {
      console.log("In subscribe");
      var data = (<any>result);

      console.log("Status is " + data.status);

      if(data.status != 200){
        this.router.navigateByUrl('/auth');
      } else {
        this.username = data.username;
      }

    });
  }

  goToArchive(){
    this.router.navigateByUrl('/archive');
  }

  goToFriends(){
    this.router.navigateByUrl('/friends');
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



