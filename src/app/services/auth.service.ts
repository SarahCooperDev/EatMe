/*
 * Provides the front end components with the methods to access the 
 * authentication api
 */

// Import required models and libraries
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { map } from 'rxjs/operators';

// Current url to determine whether local or deployed (for api calls)
const HOSTURL = window.location.hostname;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // Outlines the request header options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) {}

  /*
   * Method to call the api to save a user to database
   * 
   * @params
   * user: User - contains the user data to be saved
   */
  registerUser(user: User){
    return this.http.post('http://'+HOSTURL+':8080/api/user/register', JSON.stringify({user: user}), this.httpOptions)
      .pipe(map(res => res));
  }

  /*
  * Method to call the api to authenticate a user
  *
  * @params
  * user: User - contains the user data to be saved
  */
  loginUser(user: User){
    return this.http.post('http://'+HOSTURL+':8080/api/user/login', JSON.stringify({username: user.username, password: user.password}), this.httpOptions)
      .pipe(map(res => res));
  }

  /**
   * Method to call the api to logout a user
   */
  logout(){
    return this.http.get('http://'+HOSTURL+':8080/api/user/logout', this.httpOptions).pipe(map(res => res));
  }

  /**
   * Method to api that check the users credentials (in the request object)
   */
  checkAuth(){
    return this.http.post("http://"+HOSTURL+":8080/api/user/authenticate", '', this.httpOptions).pipe(map(res => res));
  }

  /*
   * Standardises error behaviour across the service
   * 
   * @params
   * errorSource - the error
   */
  handleError(errorSource){
    console.log(errorSource);
  }
}
