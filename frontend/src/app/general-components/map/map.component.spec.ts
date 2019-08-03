import { async, ComponentFixture, TestBed } from "@angular/core/testing";

import { MapComponent } from "./map.component";
import { AgmCoreModule, GoogleMapsAPIWrapper } from "@agm/core";
import { AgmSnazzyInfoWindowModule } from "@agm/snazzy-info-window";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";

describe("MapComponent", () => {
  let component: MapComponent;
  let fixture: ComponentFixture<MapComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MapComponent],
      imports: [
        StoreModule.forRoot(appReducers),
        HttpClientTestingModule,
        AgmCoreModule.forRoot({
          apiKey: ""
        }),
        AgmSnazzyInfoWindowModule,
        RouterTestingModule
      ],
      providers: [GoogleMapsAPIWrapper, GeoLocationService]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
