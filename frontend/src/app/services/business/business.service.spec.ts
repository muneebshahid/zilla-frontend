import { IBFilters } from "src/app/models/business_filters";
import { TestBed, inject } from "@angular/core/testing";

import { BusinessService } from "./business.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IGFilters } from "src/app/models/general_filters";
import { defaultLatlonDis } from "src/app/store/state/general";
import { dummyBusinessTypes, dummyAmenities } from "src/app/testing/models";

describe("BusinessService", () => {
  let bparams: IBFilters;
  let gparams: IGFilters;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    });

    bparams = {
      amenities: dummyAmenities,
      business_types: dummyBusinessTypes,
      paginate: false,
      paginationInfo: [0, 10, 10]
    };

    gparams = {
      latlondis: defaultLatlonDis,
      query: "",
      city: ""
    };
  });

  it("should be created", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service).toBeTruthy();
  });

  it("should return latlondis params only", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);

    const result: any = service.cleanBusinessFilters(bparams, gparams);
    expect(result.latlondis).toBe(
      `${defaultLatlonDis[0]},${defaultLatlonDis[1]},${defaultLatlonDis[2]}`
    );

    const updatedPaginationInfo = service.getBusinessFilter().paginationInfo;

    expect(updatedPaginationInfo[0]).toBe(0);
    expect(updatedPaginationInfo[1]).toBe(bparams.paginationInfo[2]);
    expect(updatedPaginationInfo[2]).toBe(bparams.paginationInfo[2]);
  });

  it("should return latlondis, amenities params", () => {
    bparams.amenities[2].checked = true;

    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);

    const result: any = service.cleanBusinessFilters(bparams, gparams);

    expect(result.latlondis).toBe(
      `${defaultLatlonDis[0]},${defaultLatlonDis[1]},${defaultLatlonDis[2]}`
    );
    expect(result.amenities).toBe("3");
  });

  it("should return latlondis, query params", () => {
    gparams.query = "burger";

    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);

    const result: any = service.cleanBusinessFilters(bparams, gparams);

    expect(result.latlondis).toBe(
      `${defaultLatlonDis[0]},${defaultLatlonDis[1]},${defaultLatlonDis[2]}`
    );
    expect(result.query).toBe("burger");
  });
  it("should return latlondis, businessType params", () => {
    bparams.business_types[2].selected = true;

    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);

    const result: any = service.cleanBusinessFilters(bparams, gparams);

    expect(result.latlondis).toBe(
      `${defaultLatlonDis[0]},${defaultLatlonDis[1]},${defaultLatlonDis[2]}`
    );
    expect(result.business_type).toBe(3);
  });
  it("should return latlondis, pagination params", () => {
    bparams.paginate = true;

    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);

    const result: any = service.cleanBusinessFilters(bparams, gparams);

    expect(result.latlondis).toBe(
      `${defaultLatlonDis[0]},${defaultLatlonDis[1]},${defaultLatlonDis[2]}`
    );
    expect(result.pagination).toBe("10,20");
  });
});
