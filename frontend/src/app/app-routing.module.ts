import { AddListingComponent } from "./add-listing-components/add-listing/add-listing.component";
import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { HomeComponent } from "./home-components/home/home.component";
import { Error404Component } from "./general-components/error404/error404.component";

export const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: ":business_slug/:business_id", component: HomeComponent },
  { path: "add_listing", component: AddListingComponent },
  { path: "404", component: Error404Component },
  {
    path: "**",
    redirectTo: "/404"
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
