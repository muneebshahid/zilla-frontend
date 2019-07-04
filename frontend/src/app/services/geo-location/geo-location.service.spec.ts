import { TestBed, fakeAsync, tick } from "@angular/core/testing";

import { GeoLocationService } from "./geo-location.service";
import { take, delay } from "rxjs/operators";
import { MapsAPILoader } from "@agm/core";

describe("GeoLocationService", () => {
  let service: GeoLocationService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoLocationService]
    });
    service = TestBed.get(GeoLocationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });

  it("should get current user coordinates", (done: DoneFn) => {
    service.getPosition().subscribe(position => {
      expect(position.coords).not.toBeUndefined();
      expect(position.coords).not.toBeNaN();
      expect(position.coords).not.toBeNull();
      done();
    });
  });
});
