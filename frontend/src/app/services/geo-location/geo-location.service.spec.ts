import { GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { TestBed } from "@angular/core/testing";

import { GeoLocationService } from "./geo-location.service";
import { mapInitObj } from "src/app/app.module";

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
