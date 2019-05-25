import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { BusinessDetailComponent } from './business-detail/business-detail.component'

const routes: Routes = [
  { path: '', redirectTo: 'detail', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'detail', component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
