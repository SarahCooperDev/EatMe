/*
 * The container component for url /menu
 */

// Import required models and libraries
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
  errorMsg = '';

  constructor(private router: Router, private authService: AuthService, private menuService: MenuService) { }

  /**
   * Authenticate user, then load users liked/menu images
   */
  ngOnInit() {
    this.errorMsg = '';

    this.authService.checkAuth().subscribe(result => {
      var data = (<any>result);

      if (data.status !== 200) {
        this.router.navigateByUrl('/auth');
      } else {
        this.menuService.getMenu().subscribe(result => {
          var data = (<any>result);
    
          if (data.menu.length < 1) {
            this.errorMsg = 'You don\'t have any dishes on your menu! Click on your friends dishes in dashboard to get started';
          } else {
            this.dishes = data.menu;      
          }
        });
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
   * Route to dashboard component (Navigation handle)
   */  
  goToDash(){
    this.router.navigateByUrl('/dashboard');
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
