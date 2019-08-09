import { GoogleMapsAPIWrapper, AgmCoreModule, MapsAPILoader } from "@agm/core";
import { TestBed, async } from "@angular/core/testing";

import { GeoLocationService } from "./geo-location.service";
import { mapInitObj } from "src/app/app.module";
import { take } from "rxjs/operators";
import { inject, NgZone } from "@angular/core";

describe("GeoLocationService", () => {
  let service: GeoLocationService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [GeoLocationService, GoogleMapsAPIWrapper],
      imports: [AgmCoreModule.forRoot(mapInitObj)]
    });
    service = TestBed.get(GeoLocationService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
