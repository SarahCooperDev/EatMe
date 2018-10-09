import { Component, OnInit } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";
import { MenuService } from "../services/menu.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {
  dishes;
  errorMsg;

  constructor(private router: Router, private authService: AuthService, private menuService: MenuService) { }

  ngOnInit() {
    this.authService.checkAuth().subscribe(result => {
      console.log("In subscribe");
      var data = (<any>result);

      console.log("Status is " + data.status);

      if(data.status != 200){
        this.router.navigateByUrl('/auth');
      } else {
        this.menuService.getMenu().subscribe(result => {
          console.log("Done get dishes");
          var data = (<any>result);
    
          if(data.menu.length < 1){
            this.errorMsg = "You don't have any dishes on your menu! Click on your friends dishes in dashboard to get started";
          } else {
            this.dishes = data.menu;
            console.log(data.menu);
      
            console.log("One example is " + this.dishes[0].path);
          }
        });
      }


    });
  }

  goToArchive(){
    this.router.navigateByUrl('/archive');
  }

  goToFriends(){
    this.router.navigateByUrl('/friends');
  }

  goToDash(){
    this.router.navigateByUrl('/dashboard');
  }

  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
