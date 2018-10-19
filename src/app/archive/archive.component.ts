/*
 * The container component for url /archive
 * 
 * Has children archive-images and image-upload
 */

// Import required models and libraries
import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { Router } from "@angular/router";
import { AuthService } from '../services/auth.service';
import { ArchiveImagesComponent } from '../archive-images/archive-images.component';
import { UploadService } from '../services/upload.service';

@Component({
  selector: 'app-archive',
  templateUrl: './archive.component.html',
  styleUrls: ['./archive.component.css']
})

export class ArchiveComponent implements OnInit {
  // Child component, so that the displayed archive images can be updated when sibling component changes
  @ViewChild(ArchiveImagesComponent)
  private imagesComponent: ArchiveImagesComponent;

  constructor(private router: Router, private authService: AuthService, private uploadService: UploadService, private ref: ChangeDetectorRef) {}

  /**
   * Checks logged in user, and redirects if user not logged in
   */
  ngOnInit() {
    this.authService.checkAuth().subscribe(result => {
      var data = (<any>result);

      if (data.status !== 200) {
        this.router.navigateByUrl('/auth');
      }
    });
  }

  /**
   * Makes child component update displayed uploaded images
   */
  imageUpdate(){
    this.imagesComponent.getDishes();
  }

  /**
   * Route to dashboard component (Navigation handle)
   */
  goToDash(){
    this.router.navigateByUrl('/dashboard');
  }
  /**
   * Route to friends component (Navigation handle)
   */
  goToFriends(){
    this.router.navigateByUrl('/friends');
  }

  /**
   * Route to menu component (Navigation handle)
   */
  goToMenu(){
    this.router.navigateByUrl('/menu');
  }

  /**
   * Logout user, and route to auth component (Navigation handle)
   */
  logout(){
    this.authService.logout().subscribe(res => {
      this.router.navigateByUrl('/auth');
    });
  }

}
