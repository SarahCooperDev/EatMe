import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';
import {SettingsComponent} from "./settings/settings.component";
import {ListComponent} from "./list/list.component";
import { CompareComponent } from './compare/compare.component';
import { ArchiveComponent } from './archive/archive.component';

const routes: Routes = [
  {path: '', redirectTo: 'auth', pathMatch: 'full'},
  {path: 'auth', component: AuthComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'settings', component: SettingsComponent},
  {path: 'list', component: ListComponent},
  {path: 'compare', component: CompareComponent},
  {path: 'archive', component: ArchiveComponent},
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
