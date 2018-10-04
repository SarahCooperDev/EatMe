import {Component, Input, OnInit} from '@angular/core';
import {User} from '../models/user';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit {

  @Input() user: User;

  constructor() { }

  ngOnInit() {
    this.user = new User;
  }

  updateUser(){
    //check user is logged in.
    //get fields, replace current user fields with these
  }
}
