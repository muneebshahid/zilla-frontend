import { AddListingComponent } from "./add-listing-components/add-listing/add-listing.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home-components/home/home.component";
import { ExploreComponent } from "./explore-components/explore/explore.component";
import { BusinessDetailComponent } from "./business-detail-components/business-detail/business-detail.component";

const routes: Routes = [
  { path: "", redirectTo: "home", pathMatch: "full" },
  { path: "home", component: HomeComponent },
  { path: "add_listing", component: AddListingComponent },
  { path: "explore", component: ExploreComponent },
  { path: "b/:business_slug/:business_id", component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
