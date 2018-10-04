import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router, private authService: AuthService) {}

  ngOnInit() {
    console.log("IN INIT");

    this.authService.checkAuth().subscribe(result => {
      console.log("In subscribe");
      var data = (<any>result);

      console.log("Status is " + data.status);

      if(data.status != 200){
        this.router.navigateByUrl('/auth');
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
