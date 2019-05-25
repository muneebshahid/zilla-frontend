import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component'
import { ExploreComponent } from './explore/explore.component'
import { BusinessDetailComponent } from './business-detail/business-detail.component'
import { ProductDetailComponent } from './product-detail/product-detail.component'

const routes: Routes = [
  { path: '', redirectTo: 'product-detail', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'explore', component: ExploreComponent },
  { path: 'product-detail', component: ProductDetailComponent },
  { path: 'detail', component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
