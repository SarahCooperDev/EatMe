import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { AppRoutingModule } from './/app-routing.module';
import {DashboardComponent} from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
import { ListComponent } from './list/list.component';
import { PlaceDetailComponent } from './place-detail/place-detail.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from "@angular/material";
import { DashDialogComponent } from './dash-dialog/dash-dialog.component';


@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    DashboardComponent,
    SettingsComponent,
    ListComponent,
    PlaceDetailComponent,
    DashDialogComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    MatGridListModule,
    MatButtonModule,
    MatDialogModule,
  ],
  exports: [
    MatGridListModule,
  ],
  entryComponents: [DashDialogComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
