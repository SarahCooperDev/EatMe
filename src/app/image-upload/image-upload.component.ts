import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { User } from '../models/user';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-image-upload',
  templateUrl: './image-upload.component.html',
  styleUrls: ['./image-upload.component.css']
})
export class ImageUploadComponent implements OnInit {
  selectedFile: File;
  location;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'my-auth-token',
      'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
    }),
    withCredentials: true,
  };

  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  onSubmit(){
    console.log(this.location);
    this.uploadService.uploadFile(this.selectedFile, this.location).subscribe(result =>{
      this.uploadService.getEatenDishes().subscribe(result => {
        console.log(result);
  
        var data = (<any>result);
  
      });
    });
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

}
