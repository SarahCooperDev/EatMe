import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppComponent} from './app.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {AuthComponent} from './auth/auth.component';

const routes: Routes = [
  {path: 'auth', component: AuthComponent},
  { path: 'auth', component: AuthComponent },
  {path: 'dashboard', component: DashboardComponent},
];
@NgModule({
  exports: [ RouterModule ],
  imports: [ RouterModule.forRoot(routes) ],
})
export class AppRoutingModule {}
