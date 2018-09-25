import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive-images',
  templateUrl: './archive-images.component.html',
  styleUrls: ['./archive-images.component.css']
})
export class ArchiveImagesComponent implements OnInit {
  dishes;

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.getEatenDishes().subscribe(result => {
      console.log(result);

      var data = (<any>result);

      this.dishes = data.images;

      console.log("Images are " + this.dishes);

    });
  }

}
