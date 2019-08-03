import { TestBed } from "@angular/core/testing";

import { LocationService } from "./location.service";
import { RouterTestingModule } from "@angular/router/testing";

describe("LocationService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [RouterTestingModule]
    })
  );

  it("should be created", () => {
    const service: LocationService = TestBed.get(LocationService);
    expect(service).toBeTruthy();
  });
});
