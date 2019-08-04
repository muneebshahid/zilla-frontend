import {
  LoadingComponent,
  MHomeMenuDrawerComponent,
  MMenuComponent,
  HomeListingComponent,
  MenuComponent,
  MapComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeComponent } from "./home.component";
import { GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { mapInitObj } from "src/app/app.module";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { RouterTestingModule } from "@angular/router/testing";

describe("HomeComponent", () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        LoadingComponent,
        MHomeMenuDrawerComponent,
        MMenuComponent,
        MenuComponent,
        HomeListingComponent,
        MapComponent
      ],
      imports: [
        StoreModule.forRoot(appReducers),
        AgmCoreModule.forRoot(mapInitObj),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [GoogleMapsAPIWrapper, GeoLocationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  // it("should create", () => {
  //   expect(component).toBeTruthy();
  // });
});
