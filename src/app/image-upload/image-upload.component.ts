/*
 * The container component for uploading an image
 * 
 * Has parent archive
 * Has sibling archive-images
 */

// Import required models and libraries
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
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

  // Handle for parent to know when it needs to refresh the display of uploaded images
  @Output() refresh = new EventEmitter<any>();

  /**
   * Sets file variable when user uploads a file
   * 
   * @param event Event for user uploading a file
   */
  onFileChanged(event){
    this.selectedFile = event.target.files[0];
  }

  /**
   * Uploads the file if validation passes
   */
  onSubmit(){
    this.errorMsg = '';

    if (!this.location) {
      this.errorMsg = 'Please enter a location';
    } else if (!this.name) {
      this.errorMsg = 'Please enter a name';
    } else if (!this.selectedFile) {
      this.errorMsg = 'Please enter a file';
    } else {
      // Uploads image
      this.uploadService.uploadFile(this.selectedFile, this.location, this.name).subscribe(result =>{
        // Refreshes display of dishes
        this.uploadService.getEatenDishes().subscribe(result => {    
          var data = (<any>result);

          if (data.status === 200){
            this.refresh.emit();
            this.adding = false;
          } else {
            this.errorMsg = data.errorMsg;
          }
        });
      });
    }
  }

  /**
   * Toggle whether the user is adding an image
   */
  showAdd(){
    this.errorMsg = '';
    if(this.adding === true){
      this.adding = false;
    } else {
      this.adding = true;
    }
  }

  constructor(private uploadService: UploadService) { }

  ngOnInit() {
  }

}
