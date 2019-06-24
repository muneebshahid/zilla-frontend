import { TestBed } from "@angular/core/testing";

import { BusinessService } from "./business.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";

describe("BusinessService", () => {
  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    })
  );

  it("should be created", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service).toBeTruthy();
  });
});
