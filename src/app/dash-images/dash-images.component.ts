import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../services/dashboard.service';

@Component({
  selector: 'app-dash-images',
  templateUrl: './dash-images.component.html',
  styleUrls: ['./dash-images.component.css']
})
export class DashImagesComponent implements OnInit {

  friendDishes;

  constructor(private dashService: DashboardService) { }

  ngOnInit() {
    this.dashService.getFriendDishes().subscribe(result => {
      console.log("Done get dishes");
      var data = (<any>result);

      this.friendDishes = data.dishes;

      console.log("One example is " + this.friendDishes[0][0].path);
    });
  }

}
