/*
 * Provides the front end components with the methods to access the 
 * menu-related api's
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
export class MenuService {
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
   * Method that calls the api that gets all of the current users
   * liked/added to menu dishes
   */
  getMenu(){
    return this.http.get('http://'+HOSTURL+':8080/api/menu/getMenu', this.httpOptions)
    .pipe(map(res => res));
  }
}
