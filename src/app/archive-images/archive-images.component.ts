import { Component, OnInit } from '@angular/core';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive-images',
  templateUrl: './archive-images.component.html',
  styleUrls: ['./archive-images.component.css']
})
export class ArchiveImagesComponent implements OnInit {

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
    this.uploadService.getEatenDishes();
  }

}
