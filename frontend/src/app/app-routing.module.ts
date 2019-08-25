import { AddListingComponent } from "./add-listing-components/add-listing/add-listing.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home-components/home/home.component";

export const routes: Routes = [
  // { path: "", redirectTo: "/", pathMatch: "full" },
  { path: "", component: HomeComponent },
  { path: ":business_slug/:business_id", component: HomeComponent },
  { path: "add_listing", component: AddListingComponent }
  // { path: "b/:business_slug/:business_id", component: BusinessDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
