/*
 * Provides the front end components with the methods to access the 
 * authentication api
 */

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from '../../../node_modules/rxjs';
import { CATCH_ERROR_VAR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  // url of the api to create or update a user
  saveuserURL = 'http://localhost:8080/api/saveuser';

  // Outlines the request header options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
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
    var postResponse = this.http.post('http://localhost:8080/api/saveuser', JSON.stringify({"user": user, "mode": "SAVE"}), this.httpOptions)
    .pipe().subscribe();
    console.log(postResponse);
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
