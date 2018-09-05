import { Component, OnInit, Inject } from '@angular/core';
import { Router } from "@angular/router";
//import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import {MatDialog, MatDialogConfig} from "@angular/material";
import {DashDialogComponent} from "../dash-dialog/dash-dialog.component";

// export interface DialogData {
//   placeName: string;
//   placeLocation: string;
//   placeRating: string;
// }

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

export class DashboardComponent implements OnInit {

  constructor(private router: Router, public dialog: MatDialog) {}

  // placeName: string;
  // placeLocation: string;
  // placeRating: string;

  ngOnInit() {}

   showDialog(): void {
     // alert("DIALOG");
     const dialogConfig = new MatDialogConfig();
     dialogConfig.disableClose = true;
     dialogConfig.autoFocus = true;
     this.dialog.open(DashDialogComponent, dialogConfig);
     //   const dialogRef = this.dialog.open(DashboardComponentDialog, {
  //     width: '250px',
  //     data: {
  //       placeName: this.placeName,
  //       placeLocation: this.placeLocation,
  //       placeRating: this.placeRating
  //     }
  //   });
  //
  //   dialogRef.afterClosed().subscribe(result => {
  //     console.log('The dialog was closed');
  //     this.placeRating = result;
  //   });
   }
}



