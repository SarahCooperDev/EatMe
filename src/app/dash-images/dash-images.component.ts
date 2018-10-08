import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dash-images',
  templateUrl: './dash-images.component.html',
  styleUrls: ['./dash-images.component.css']
})
export class DashImagesComponent implements OnInit {

  friendDishes;
  errorMsg;

  constructor(private dashService: DashboardService) { }

  ngOnInit() {
    this.dashService.getFriendDishes().subscribe(result => {
      console.log("Done get dishes");
      var data = (<any>result);

      console.log("Length is " + data.dishes.length);
      if(data.dishes.length < 1){
        this.errorMsg = "You have no dishes to view! Try adding more friends";
      } else {
        this.friendDishes = data.dishes;
        console.log("One example is " + this.friendDishes[0].path);
      }
    });
  }

  addToMenu(toEat){
    var dish = (<any>toEat);

    console.log("In add to menu");
    console.log("Dish is " + dish);
    console.log("Dish path is " + dish.path);

    this.dashService.addFriendsDish(dish).subscribe(res => {
      console.log("Added dish");
      console.log(res);
    });
  }

}
