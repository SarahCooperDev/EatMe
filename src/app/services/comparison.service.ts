import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { CATCH_ERROR_VAR } from '@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class ComparisonService {

  checkUrl = 'http://localhost:8080/api/compare';

  // Outlines the request header options
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    })
  };

  constructor(private http: HttpClient) { }

  checkWord(word: String){
    console.log("In service");

    return this.http.post(this.checkUrl, JSON.stringify({"word": word}), this.httpOptions)
    .pipe(map(res=>res));
  }
}
