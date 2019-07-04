import { Component, Input, NgZone, DebugElement } from "@angular/core";
import { async, ComponentFixture, TestBed, inject } from "@angular/core/testing";
import { LocationComponent } from "./location.component";
import { AgmCoreModule, GoogleMapsAPIWrapper, MapsAPILoader } from "@agm/core";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { By } from "@angular/platform-browser";

@Component({ selector: "app-map", template: "" })
class MapComponent {
  @Input() mapClass = "";
}

describe("LocationComponent", () => {
  let component: LocationComponent;
  let fixture: ComponentFixture<LocationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LocationComponent, MapComponent],
      providers: [GoogleMapsAPIWrapper, GeoLocationService],
      imports: [
        AgmCoreModule.forRoot({
          apiKey: "AIzaSyAZfyL5pncodSyDVTP28vnyQep4SNeQDgY",
          libraries: ["places"]
        })
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
});
