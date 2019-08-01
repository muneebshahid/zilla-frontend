import { GeoLocationService } from "./services/geo-location/geo-location.service";
import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home-components/home/home.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { StoreModule } from "@ngrx/store";
import { EffectsModule } from "@ngrx/effects";
import { StoreRouterConnectingModule } from "@ngrx/router-store";
import { appReducers } from "./store/reducers/app.reducer";
import { environment } from "../environments/environment";
import { NgSelectModule } from "@ng-select/ng-select";
import { ProductEffects } from "./store/effects/product";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { MatButtonModule } from "@angular/material/button";

import {
  HomeFilterDrawerComponent,
  HomeListingsComponent,
  MHomeMenuDrawerComponent,
  MFilterMapMenuComponent,
  HomeDetailDrawerComponent,
  HomeDrawersContainerComponent
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
  MenuComponent,
  MapComponent,
  DetailHeaderGalleryComponent,
  DetailHeaderComponent,
  FooterComponent,
  MMenuComponent,
  ProductInfoComponent,
  LoadingComponent,
  BusinessInfoComponent
} from "./general-components";

import { HttpClientModule } from "@angular/common/http";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { BusinessEffects } from "./store/effects/business";
import { ShareModule } from "@ngx-share/core";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";

import {
  AddListingComponent,
  GeneralInfoComponent,
  LocationComponent,
  OpeningClosingHoursComponent,
  AddMenuComponent,
  AddMediaComponent,
  AddSocialLinksComponent,
  ListingTagsComponent
} from "./add-listing-components";

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
    LoadingComponent,
    AddListingComponent,
    LocationComponent,
    OpeningClosingHoursComponent,
    GeneralInfoComponent,
    AddMenuComponent,
    AddMediaComponent,
    AddSocialLinksComponent,
    ListingTagsComponent,
    ProductInfoComponent,
    HomeDetailDrawerComponent,
    HomeDrawersContainerComponent,
    BusinessInfoComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    MatButtonModule,
    FontAwesomeModule,
    ShareModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    NgSelectModule,
    ReactiveFormsModule,
    StoreModule.forRoot(appReducers),
    EffectsModule.forRoot([ProductEffects, BusinessEffects]),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
    StoreRouterConnectingModule.forRoot({ stateKey: "router" }),
    AgmCoreModule.forRoot({
      apiKey: "AIzaSyAS9PrkmHZ1IKqOfWJ2sEqhKzGlv4_Eojg",
      libraries: ["places", "geometry"]
    }),
    AgmSnazzyInfoWindowModule,
    BrowserAnimationsModule,
    InfiniteScrollModule
  ],
  providers: [GoogleMapsAPIWrapper, GeoLocationService],
  bootstrap: [AppComponent],
  entryComponents: [HomeDetailDrawerComponent]
})
export class AppModule {}
