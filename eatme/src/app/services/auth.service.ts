import { Injectable } from '@angular/core';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //mongoose = require('mongoose');

  constructor() {
    
   }

  registerUser(user: User){
    //this.mongoose.connect('mongodb://localhost:27017/eatmedb', { useNewUrlParser: true });

    /*this.MongoClient.connect(this.url, function(err, db){
      if(err) throw err;

      console.log("Database created");
      db.close();

    });*/
  }
}
