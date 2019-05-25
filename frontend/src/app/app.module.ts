import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home-components/home/home.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HomeFilterDrawerComponent } from './home-components/home-filter-drawer/home-filter-drawer.component';
import { HomeListingsComponent } from './home-components/home-listings/home-listings.component';
import { MenuComponent } from './general-components/menu/menu.component';
import { MapComponent } from './general-components/map/map.component';
import { BusinessDetailComponent } from './business-detail-components/business-detail/business-detail.component';
import { BusinessDetailHeaderGalleryComponent } from './business-detail-components/business-detail-header-gallery/business-detail-header-gallery.component';
import { BusinessDetailHeaderComponent } from './business-detail-components/business-detail-header/business-detail-header.component';
import { BusinessDetailContainerComponent } from './business-detail-components/business-detail-container/business-detail-container.component';
import { BusinessDetailDescriptionComponent } from './business-detail-components/business-detail-description/business-detail-description.component';
import { BusinessDetailMenuComponent } from './business-detail-components/business-detail-menu/business-detail-menu.component';
import { BusinessDetailAmenitiesComponent } from './business-detail-components/business-detail-amenities/business-detail-amenities.component';
import { BusinessDetailGalleryComponent } from './business-detail-components/business-detail-gallery/business-detail-gallery.component';
import { BusinessDetailOpeningHoursComponent } from './business-detail-components/business-detail-opening-hours/business-detail-opening-hours.component';
import { BusinessDetailMapComponent } from './business-detail-components/business-detail-map/business-detail-map.component';
import { FooterComponent } from './general-components/footer/footer.component';
import { ExploreComponent } from './explore-components/explore/explore.component';
import { ExploreBusinessesComponent } from './explore-components/explore-businesses/explore-businesses.component';
import { ExploreProductsComponent } from './explore-components/explore-products/explore-products.component';
import { ProductDetailComponent } from './general-components/product-detail/product-detail.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeFilterDrawerComponent,
    HomeListingsComponent,
    MenuComponent,
    MapComponent,
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
    FooterComponent,
    ExploreComponent,
    ExploreBusinessesComponent,
    ExploreProductsComponent,
    ProductDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAZfyL5pncodSyDVTP28vnyQep4SNeQDgY'}),
    BrowserAnimationsModule
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
