import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-components/home/home.component";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { appReducers } from "./store/reducers/app.reducer";
import { environment } from "../environments/environment";

import { ProductEffects } from "./store/effects/product";

import {
  HomeFilterDrawerComponent,
  HomeListingsComponent,
  MHomeMenuDrawerComponent,
  MFilterMapMenuComponent
} from "./home-components";

import {
  BusinessDetailComponent,
  BusinessDetailHeaderGalleryComponent,
  BusinessDetailHeaderComponent,
  BusinessDetailContainerComponent,
  BusinessDetailDescriptionComponent,
  BusinessDetailMenuComponent,
  BusinessDetailAmenitiesComponent,
  BusinessDetailGalleryComponent,
  BusinessDetailMapComponent,
  BusinessDetailOpeningHoursComponent
} from "./business-detail-components";

import {
  ExploreComponent,
  ExploreBusinessesComponent,
  ExploreProductsComponent
} from "./explore-components";

import { MenuComponent, MapComponent, FooterComponent, MMenuComponent } from "./general-components";
import { HttpClientModule } from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeFilterDrawerComponent,
    HomeListingsComponent,
    MHomeMenuDrawerComponent,
    MFilterMapMenuComponent,
    MenuComponent,
    MapComponent,
    FooterComponent,
    MMenuComponent,
    BusinessDetailComponent,
    BusinessDetailHeaderGalleryComponent,
    BusinessDetailHeaderComponent,
    BusinessDetailContainerComponent,
    BusinessDetailDescriptionComponent,
    BusinessDetailMenuComponent,
    BusinessDetailAmenitiesComponent,
    BusinessDetailGalleryComponent,
    BusinessDetailOpeningHoursComponent,
    BusinessDetailMapComponent,
    ExploreComponent,
    ExploreBusinessesComponent,
    ExploreProductsComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    AgmCoreModule.forRoot({ apiKey: "AIzaSyAZfyL5pncodSyDVTP28vnyQep4SNeQDgY" }),
    BrowserAnimationsModule
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule {}
