import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { HomeFilterDrawerComponent } from "./home-filter-drawer.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { mapInitObj } from "src/app/app.module";

describe("HomeFilterDrawerComponent", () => {
  let component: HomeFilterDrawerComponent;
  let fixture: ComponentFixture<HomeFilterDrawerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeFilterDrawerComponent],
      providers: [GeoLocationService, GoogleMapsAPIWrapper],
      imports: [
        NgSelectModule,
        FormsModule,
        StoreModule.forRoot(appReducers),
        AgmCoreModule.forRoot(mapInitObj),
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFilterDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
