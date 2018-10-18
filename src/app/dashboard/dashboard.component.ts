/*
 * The container component for url /dashboard
 * 
 * Has children dash-images
 */

// Import required models and libraries
import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
import { MatDialog } from "@angular/material";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {
  username;

  constructor(private router: Router, private authService: AuthService, public dialog: MatDialog) {}

  /**
   * Authenticate and redirect if user not logged in
   */
  ngOnInit() {
    this.authService.checkAuth().subscribe(result => {
      var data = (<any>result);

      if (data.status !== 200) {
        this.router.navigateByUrl('/auth');
      } else {
        this.username = data.username;
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



