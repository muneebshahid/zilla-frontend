import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { AgmCoreModule, GoogleMapsAPIWrapper } from '@agm/core';
import { FormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatSidenavModule, 
        MatFormFieldModule,
        MatInputModule,
        MatRippleModule} from '@angular/material';

import {MatGridListModule} from '@angular/material/grid-list';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule.forRoot(),
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatGridListModule,
    MatRippleModule,
    AgmCoreModule.forRoot({apiKey: 'AIzaSyAZfyL5pncodSyDVTP28vnyQep4SNeQDgY'}),
    BrowserAnimationsModule,
    MatSidenavModule
  ],
  providers: [GoogleMapsAPIWrapper],
  bootstrap: [AppComponent]
})
export class AppModule { }
