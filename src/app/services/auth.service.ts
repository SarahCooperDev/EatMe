/*
 * Provides the front end components with the methods to access the 
 * authentication api
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { Observable} from 'rxjs';
//import 'rxjs/add/operator/map';
import { map } from 'rxjs/operators';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

//import {HOSTURL} from "../env";

// HOST URL from params??? == window.location.hostname;
const HOSTURL = window.location.hostname;

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url of the api to create or update a user
  saveuserURL = 'http://'+HOSTURL+':8080/api/saveuser';

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
   * Method to call the api to save a user
   * 
   * @params
   * user: User - contains the user data to be saved
   */
  registerUser(user: User){
    console.log("Register user");
    console.log(user);

    // Http call to the api, retrives an object from the server
    return this.http.post('http://'+HOSTURL+':8080/api/user/register', JSON.stringify({"user": user}), this.httpOptions)
      .pipe(map(res => res));
  }

  /*
  * Method to call the api to authenticate a user
  *
  * @params
  * user: User - contains the user data to be saved
  */
  loginUser(user: User){
    console.log("Login user");
    console.log(user);

    let params = new HttpParams().set("username", user.username);
    params.append("someParamKey", user.username);

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'my-auth-token');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    console.log(user.username);
    // Http call to the api, retrives an object from the server
    var postResponse = this.http.post('http://'+HOSTURL+':8080/api/user/login', JSON.stringify({"username": user.username, "password": user.password}), this.httpOptions)
      .pipe(map(res => res));
    return postResponse;
  }

  logout(){
    return this.http.get('http://'+HOSTURL+':8080/api/user/logout', this.httpOptions).pipe(map(res => res));
  }

  checkAuth(){
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'my-auth-token');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    console.log("In Check Auth");
    return this.http.post("http://"+HOSTURL+":8080/api/user/authenticate", '', this.httpOptions).pipe(map(res => res));
  }

  updateUserInfo(user: User, newPassword){
    console.log("Update user");
    console.log(user);

    let params = new HttpParams().set("username", user.username);
    params.append("newPassword", newPassword);
    params.append("someParamKey", user.username);

    //USE PASSWORD HASHING AND CHECKS.

    let headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    headers.append('Authorization', 'my-auth-token');
    headers.append('Access-Control-Allow-Headers', 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With');

    console.log(user.username);
    // Http call to the api, retrives an object from the server
    var postResponse = this.http.post('http://'+HOSTURL+':8080/api/user/update', this.httpOptions)
      .pipe(map(res => res));
    return postResponse;
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
