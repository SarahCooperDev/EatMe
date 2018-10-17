import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { map } from 'rxjs/operators';

//import {HOSTURL} from "../env";
const HOSTURL = window.location.hostname;

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  httpOptions = {
    headers: new HttpHeaders({

      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  constructor(private http: HttpClient) { }

  getFriendDishes(){
    console.log("In dash service");
    return this.http.get('http://'+HOSTURL+':8080/api/friends/friendsdishes', this.httpOptions)
    .pipe(map(res => res));
  }

  addFriendsDish(dish){
    console.log("Adding friends dish");
    console.log(dish.path);

    return this.http.post('http://'+HOSTURL+':8080/api/menu/addtomenu', {dish: dish}, this.httpOptions)
    .pipe(map(res => res));
  }
}
