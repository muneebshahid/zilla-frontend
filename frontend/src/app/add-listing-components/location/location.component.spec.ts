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
  it("should ensure that the labels are named correctly", () => {
    const listingElementDe: DebugElement = fixture.debugElement;

    const locationDe = listingElementDe.query(By.css(".location"));
    const websiteDe = listingElementDe.query(By.css(".website"));
    const phoneDe = listingElementDe.query(By.css(".phone"));
    const emailDe = listingElementDe.query(By.css(".email"));

    expect(locationDe.nativeElement.textContent).toEqual("Location");
    expect(websiteDe.nativeElement.textContent).toEqual("Website");
    expect(phoneDe.nativeElement.textContent).toEqual("Phone");
    expect(emailDe.nativeElement.textContent).toEqual("Email");
  });
});
