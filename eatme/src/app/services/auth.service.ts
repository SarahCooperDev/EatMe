import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { User } from '../models/user';
import { Observable } from '../../../node_modules/rxjs';
import { CATCH_ERROR_VAR } from '../../../node_modules/@angular/compiler/src/output/output_ast';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) {
    
   }

  registerUser(user: User){
    console.log("Register user");
    console.log(user);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        //'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Authorization': 'my-auth-token',
        'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
      })
    };

    var postResponse = this.http.post('http://localhost:8080/api/saveuser', JSON.stringify({"user": user, "mode": "SAVE"}), httpOptions)
    .pipe().subscribe();
    console.log(postResponse);
    //this.mongoose.connect('mongodb://localhost:27017/eatmedb', { useNewUrlParser: true });

    /*this.MongoClient.connect(this.url, function(err, db){
      if(err) throw err;

      console.log("Database created");
      db.close();

    });*/
  }

  handleError(errorSource){
    console.log(errorSource);
  }
}
