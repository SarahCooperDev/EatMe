/*
 * The container component for displaying a users uploaded images/dishes
 * 
 * Has parent archive
 * Has sibling image-upload
 */

// Import required models and libraries
import { Component, OnInit, Output, EventEmitter, ChangeDetectorRef } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive-images',
  templateUrl: './archive-images.component.html',
  styleUrls: ['./archive-images.component.css']
})

export class ArchiveImagesComponent implements OnInit {
  dishes;
  errorMsg = '';

  constructor(private uploadService: UploadService, private ref: ChangeDetectorRef) { }

  /**
   * Load in users dishes on page initialisation
   */
  ngOnInit() {
    this.errorMsg = '';
    this.getDishes();
  }

  /**
   * Retrieves all images a user has uploaded and loads them into
   * dishes variable for display
   */
  getDishes(){
    this.errorMsg = '';

    this.uploadService.getEatenDishes().subscribe(result => {
      var data = (<any>result);

      if (data.status !== 200) {
        this.errorMsg = data.errorMsg;
      } else if (data.images.length < 1) {
        this.errorMsg = 'You haven\'t uploaded any dishes yet! Choose a file to get started';
      } else {
        this.dishes = data.images;
      }
    });
  }
}
