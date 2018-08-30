import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'EatMe';

  constructor(private router: Router) {
    this.checkURL();
    // route to /auth when page is set up.
    this.router.navigate(["/auth"]);
  }

  // logs the current URL of the page, for debugging purposes.
  checkURL(): boolean {
    console.log('hello: ' + this.router.url);
    return true;
  }
}
