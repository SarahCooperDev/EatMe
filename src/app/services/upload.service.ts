import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class UploadService {

  // url of the api to create or update a user
  uploadURL = 'http://localhost:8080/api/upload';

  // Outlines the request header options
  httpOptions = {
    headers: new HttpHeaders({

      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  uploadFile(file: File){
    console.log("In service");

    const uploadData = new FormData();
    uploadData.append('dish', file, file.name);
    this.http.post('http://localhost:8080/api/upload', uploadData, this.httpOptions).subscribe(event => {
      console.log(event);
    });
  }

  authenticate(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      }),
      withCredentials: true,
    };

    this.http.post('http://localhost:8080/api/authenticate', {}, httpOptions).subscribe(event =>{
      console.log(event);
    });
  }

  getEatenDishes(){
    var httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      }),
      withCredentials: true,
    };

    this.http.post('http://localhost:8080/api/eatenDishes', {}, httpOptions).subscribe(event =>{
      console.log(event);
    });
  }
}
