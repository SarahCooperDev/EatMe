/*
 * Provides the front end components with the methods to access the 
 * archive-related api's
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
export class UploadService {
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
   * Method that calls the api to upload a file to a users images
   * 
   * @param file The file that the user has uploaded
   * @param location The location the user has input
   * @param name The name of the dish the user has input
   */
  uploadFile(file: File, location: string, name: string){
    // Create a form for simpler file transfer
    const uploadData = new FormData();
    uploadData.append('dish', file, file.name);
    uploadData.append('location', location);
    uploadData.append('name', name);

    return this.http.post('http://'+HOSTURL+':8080/api/archive/upload', uploadData, this.httpOptions)
    .pipe(map(res => res));
  }

  /**
   * Method that calls api to get all the users uploaded images
   */
  getEatenDishes(){
    return this.http.get('http://'+HOSTURL+':8080/api/archive/eatenDishes', this.httpOptions)
    .pipe(map(res => res));
  }
}
