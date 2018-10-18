/*
 * The container component for displaying the users friends images
 * 
 * Has parent dashboard
 */

// Import required models and libraries
import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dash-images',
  templateUrl: './dash-images.component.html',
  styleUrls: ['./dash-images.component.css']
})

export class DashImagesComponent implements OnInit {
  friendDishes;
  errorMsg = '';
  successMsg = '';

  constructor(private dashService: DashboardService) { }

  /**
   * Load in users friends dishes on page initialization
   */
  ngOnInit() {
    this.errorMsg = '';
    this.successMsg = '';

    this.dashService.getFriendDishes().subscribe(result => {
      var data = (<any>result);

      if (data.dishes.length < 1) {
        this.errorMsg = "You have no dishes to view! Try adding more friends";
      } else {
        this.friendDishes = data.dishes;
      }
    });
  }

  /**
   * When user clicks an image, add that image to their menu
   * @param toEat The dish that has been clicked
   */
  addToMenu(toEat){
    this.errorMsg = '';
    this.successMsg = '';

    var dish = (<any>toEat);

    this.dashService.addFriendsDish(dish).subscribe(res => {
      this.successMsg = "Added dish to menu!";
    });
  }

}
