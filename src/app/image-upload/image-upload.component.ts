import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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
  name;
  adding = false;
  errorMsg = '';
  @Output() refresh = new EventEmitter<any>();

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
    console.log(this.selectedFile.name);
  }

  onSubmit(){
    this.errorMsg = '';
    console.log(this.location);
    if(!this.location){
      this.errorMsg = "Please enter a location";
    } else if(!this.name){
      this.errorMsg = "Please enter a name";
    } else if(!this.selectedFile){
      this.errorMsg = "Please enter a file";
    } else {
      this.uploadService.uploadFile(this.selectedFile, this.location, this.name).subscribe(result =>{
        this.uploadService.getEatenDishes().subscribe(result => {
          console.log(result);
    
          var data = (<any>result);

          if(data.status == '200'){
            this.refresh.emit();
            console.log("Emitted");
            this.adding = false;
          } else {
            this.errorMsg = data.errorMsg;
          }
        });
      });
    }
  }

  showAdd(){
    this.errorMsg = '';
    if(this.adding == true){
      this.adding = false;
    } else {
      this.adding = true;
    }
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

}
