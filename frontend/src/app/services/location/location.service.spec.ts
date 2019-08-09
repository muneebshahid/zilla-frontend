import { TestBed } from "@angular/core/testing";

import { LocationService } from "./location.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("LocationService", () => {
  let service: LocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    });
    service = TestBed.get(LocationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
  it("should set BrowserURL using setDetailLocation", () => {
    let loc = jasmine.createSpyObj("Location", ["replaceState"]);
    service = new LocationService(loc);
    service.setDetailLocation(0, "");
    expect(loc.replaceState).toHaveBeenCalled();
  });
  it("should set BrowserURL to / using clearLocation", () => {
    let loc = jasmine.createSpyObj("Location", ["replaceState"]);
    service = new LocationService(loc);
    service.clearLocation();
    expect(loc.replaceState).toHaveBeenCalled();
  });
});
