import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import {MatDialog, MatDialogConfig} from "@angular/material";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

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

  /**
   * route to archive component
   */
  goToArchive(){
    this.router.navigateByUrl('/archive');
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



