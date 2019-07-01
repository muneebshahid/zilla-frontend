import { IBusiness } from "./../../models/business";
import { TestBed } from "@angular/core/testing";
import { BusinessService } from "./business.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of, Observable } from "rxjs";
import { empty } from "rxjs";

describe("BusinessService", () => {
  const emptyObs: IBusiness[] = [
    {
      user: 0,
      images: [],
      business_type: Object.assign({}),
      opening_timings: [],
      is_open: false,
      title: "",
      slug: "",
      description: "",
      website: "",
      address: "",
      claimed: false,
      phone: "",
      expensive: 0,
      latlng: []
    }
  ];

  beforeEach(() => {
    const stubValue = of();

    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
  });

  it("should be created", () => {
    let service = TestBed.get(BusinessService);
    expect(service).toBeTruthy();
  });

  it("#getBusinessDetail should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs[0]);
    httpServiceSpy.get.and.returnValue(stubValue);

    let businessService = new BusinessService(httpServiceSpy);

    expect(businessService.getBusinessDetail("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getNearbyBusinesses should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs[0]);
    httpServiceSpy.get.and.returnValue(stubValue);

    let businessService = new BusinessService(httpServiceSpy);

    expect(businessService.getNearbyBusinesses("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getExploreBusinesses should return stubbed observable value", () => {
    const httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    // set the value to return when the `get` spy is called.
    const stubValue = of(emptyObs);
    httpServiceSpy.get.and.returnValue(stubValue);

    let businessService = new BusinessService(httpServiceSpy);

    expect(businessService.getExploreBusiness("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
