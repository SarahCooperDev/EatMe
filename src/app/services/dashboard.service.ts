/*
 * Provides the front end components with the methods to access the 
 * dashboard-related api's
 */

// Import required models and libraries
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

// Current url to determine whether local or deployed (for api calls)
const HOSTURL = window.location.hostname;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {
  // Outlines the request header options
  httpOptions = {
    headers: new HttpHeaders({

      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  /**
   * Method to call the api that gets all the current users friends dishes/images
   */
  getFriendDishes(){
    return this.http.get('http://'+HOSTURL+':8080/api/friends/friendsdishes', this.httpOptions)
    .pipe(map(res => res));
  }

  /**
   * Method to call the api that adds a friends dish to the users menu list
   * 
   * @param dish The friends image/dish that the user clicked to add to menu
   */
  addFriendsDish(dish){
    return this.http.post('http://'+HOSTURL+':8080/api/menu/addtomenu', {dish: dish}, this.httpOptions)
    .pipe(map(res => res));
  }
}
