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
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  uploadFile(file: File){
    console.log("In service");

    const uploadData = new FormData();
    uploadData.append('foodFile', file, file.name);
    this.http.post('http://localhost:8080/api/upload', uploadData).subscribe(event => {
      console.log(event);
    });
  }
}
