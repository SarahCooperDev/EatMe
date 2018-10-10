import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';
import {HOSTURL} from "../env";

@Injectable({
  providedIn: 'root'
})
export class FriendService {

  httpOptions = {
    headers: new HttpHeaders({
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  getFriends(){
    console.log("In get friends");
    return this.http.get('http://'+HOSTURL+'calhost:8080/api/getFriends', this.httpOptions)
    .pipe(map(res => res));
  }

  addFriend(searchedUsername: String){
    console.log("IN add " + searchedUsername);

    return this.http.post('http://'+HOSTURL+':8080/api/addFriend', {searched: searchedUsername}, this.httpOptions)
    .pipe(map(res=>res));
  }
}
