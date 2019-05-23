import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { HomeFilterDrawerComponent } from './home-filter-drawer/home-filter-drawer.component';
import { HomeListingsComponent } from './home-listings/home-listings.component';
import { MenuComponent } from './menu/menu.component';
import { HomeMapComponent } from './home-map/home-map.component';
import { BusinessDetailComponent } from './business-detail/business-detail.component';
import { BusinessDetailHeaderGalleryComponent } from './business-detail-header-gallery/business-detail-header-gallery.component';
import { BusinessDetailHeaderComponent } from './business-detail-header/business-detail-header.component';
import { BusinessDetailContainerComponent } from './business-detail-container/business-detail-container.component';
import { BusinessDetailDescriptionComponent } from './business-detail-description/business-detail-description.component';
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HomeFilterDrawerComponent,
    HomeListingsComponent,
    MenuComponent,
    HomeMapComponent,
    BusinessDetailComponent,
    BusinessDetailHeaderGalleryComponent,
    BusinessDetailHeaderComponent,
    BusinessDetailContainerComponent,
    BusinessDetailDescriptionComponent
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
