import { IBusiness } from "./../../models/business";
import { TestBed } from "@angular/core/testing";
import { BusinessService } from "./business.service";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { of } from "rxjs";
import { IAppState } from "src/app/store/state/app.state";
import { MockStore, provideMockStore } from "@ngrx/store/testing";
import { businessObj, storeInitialState } from "src/app/testing/models";

describe("BusinessService", () => {
  let store: MockStore<IAppState>;
  const initialState = storeInitialState;
  let httpServiceSpy;
  let stubValue;
  let businessService;
  let filterServiceSpy;
  let locationServiceSpy;
  const emptyObs: IBusiness[] = businessObj;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        provideMockStore({ initialState })
        // other providers
      ]
    });

    httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);
    stubValue = of(emptyObs[0]);
    httpServiceSpy.get.and.returnValue(stubValue);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["get"]);
    filterServiceSpy.get.and.returnValue(stubValue);
    locationServiceSpy = jasmine.createSpyObj("LocationService", ["get"]);
    locationServiceSpy.get.and.returnValue(stubValue);

    businessService = new BusinessService(
      httpServiceSpy,
      filterServiceSpy,
      store,
      locationServiceSpy
    );
  });

  it("should be created", () => {
    const service = TestBed.get(BusinessService);
    expect(service).toBeTruthy();
  });

  it("#getBusinessDetail should return stubbed observable value", () => {
    expect(businessService.getBusinessDetail("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getNearbyBusinesses should return stubbed observable value", () => {
    expect(businessService.getNearbyBusinesses("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });

  it("#getExploreBusinesses should return stubbed observable value", () => {
    expect(businessService.getExploreBusiness("dummy-slug-id")).toBe(
      stubValue,
      "service returned stub value"
    );
    expect(httpServiceSpy.get.calls.count()).toBe(1, "spy method was called once");
    expect(httpServiceSpy.get.calls.mostRecent().returnValue).toBe(stubValue);
  });
});
