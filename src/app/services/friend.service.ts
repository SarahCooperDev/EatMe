/*
 * Provides the front end components with the methods to access the 
 * friend-related api's
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
export class FriendService {
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
   * Method that calls the api to return a list of current users friends
   */
  getFriends(){
    return this.http.get('http://'+HOSTURL+':8080/api/friends/getFriends', this.httpOptions)
    .pipe(map(res => res));
  }

  /**
   * Method that calls the api to add the searched username to the
   * current users friend list, returning the new friend list 
   * 
   * @param searchedUsername Friend username current user is trying to add
   */
  addFriend(searchedUsername: String){
    return this.http.post('http://'+HOSTURL+':8080/api/friends/addFriend', {searched: searchedUsername}, this.httpOptions)
    .pipe(map(res=>res));
  }
}
