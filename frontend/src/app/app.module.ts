import { GeoLocationService } from "./services/geo-location/geo-location.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-components/home/home.component";
import { FormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { appReducers } from "./store/reducers/app.reducer";
import { environment } from "../environments/environment";
import { NgSelectModule } from '@ng-select/ng-select';
import { ProductEffects } from "./store/effects/product";

import {
  HomeFilterDrawerComponent,
  HomeListingsComponent,
  MHomeMenuDrawerComponent,
  MFilterMapMenuComponent,
  HomeProductInfoComponent
} from "./home-components";

import {
  BusinessDetailComponent,
  BusinessDetailContainerComponent,
  BusinessDetailMenuComponent,
  BusinessDetailAmenitiesComponent,
  BusinessDetailMapComponent,
  BusinessDetailOpeningHoursComponent
} from "./business-detail-components";

import {
  ExploreComponent,
  ExploreBusinessesComponent,
  ExploreProductsComponent
} from "./explore-components";

import {
  MenuComponent,
  MapComponent,
  DetailHeaderGalleryComponent,
  DetailHeaderComponent,
  FooterComponent,
  MMenuComponent,
  LoadingComponent
} from "./general-components";
import { ProductDetailComponent } from "./product-detail-components";

import { HttpClientModule } from "@angular/common/http";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { BusinessEffects } from "./store/effects/business";
import { AddListingComponent } from './add-listing-components/add-listing/add-listing.component';

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
    DetailHeaderGalleryComponent,
    DetailHeaderComponent,
    BusinessDetailContainerComponent,
    BusinessDetailMenuComponent,
    BusinessDetailAmenitiesComponent,
    BusinessDetailOpeningHoursComponent,
    BusinessDetailMapComponent,
    ExploreComponent,
    ExploreBusinessesComponent,
    ExploreProductsComponent,
    HomeProductInfoComponent,
    LoadingComponent,
    ProductDetailComponent,
    AddListingComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    NgSelectModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductEffects, BusinessEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    AgmCoreModule.forRoot({ apiKey: "AIzaSyAZfyL5pncodSyDVTP28vnyQep4SNeQDgY" }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule
  ],
  providers: [GoogleMapsAPIWrapper, GeoLocationService],
  bootstrap: [AppComponent]
})
export class AppModule {}
