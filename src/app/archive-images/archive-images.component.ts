import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive-images',
  templateUrl: './archive-images.component.html',
  styleUrls: ['./archive-images.component.css']
})
export class ArchiveImagesComponent implements OnInit {
  dishes;
  

  constructor(private uploadService: UploadService, private ref: ChangeDetectorRef) { }

  ngOnInit() {
    this.getDishes();
  }

  getDishes(){
    console.log("Updating UI");
    this.uploadService.getEatenDishes().subscribe(result => {
      console.log(result);

      var data = (<any>result);

      this.dishes = data.images;

      console.log("Images are " + this.dishes);
      this.ref.detectChanges();
    });

  }

}
