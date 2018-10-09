import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive-images',
  templateUrl: './archive-images.component.html',
  styleUrls: ['./archive-images.component.css']
})
export class ArchiveImagesComponent implements OnInit {
  dishes;
  errorMsg;

  constructor(private uploadService: UploadService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDishes();
  }

  getDishes(){
    console.log("Updating UI");
    this.uploadService.getEatenDishes().subscribe(result => {
      console.log(result);

      var data = (<any>result);

      if(data.images.length < 1){
        this.errorMsg = "You haven't uploaded any dishes yet! Choose a file to get started"
      } else {
        this.dishes = data.images;
        console.log("Images are " + this.dishes);
      }
      //this.ref.detectChanges();
    });

  }

}
