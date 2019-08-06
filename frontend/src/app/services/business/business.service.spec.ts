import { IBFilters } from "src/app/models/business_filters";
import { TestBed } from "@angular/core/testing";

import { BusinessService } from "./business.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IGFilters } from "src/app/models/general_filters";
import { defaultLatlonDis } from "src/app/store/state/general";
import { dummyBusinessTypes, dummyAmenities, businessObj } from "src/app/testing/models";

describe("BusinessService", () => {
  let bparams: IBFilters;
  let gparams: IGFilters;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    });

    dummyAmenities[0].checked = false;
    dummyAmenities[1].checked = false;
    dummyAmenities[2].checked = false;

    dummyBusinessTypes[0].selected = false;
    dummyBusinessTypes[1].selected = false;
    dummyBusinessTypes[2].selected = false;

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

  it("should return markers using getMarkersFromPayload", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    const result: any = service.getMarkersFromPayload(businessObj);
    expect(result[0].id).toBe(0);
    expect(result[0].latlon[0]).toBe(1);
    expect(result[0].latlon[1]).toBe(2);
    expect(result[0].latlon[2]).toBe(3);
    expect(result[1].id).toBe(1);
    expect(result[1].latlon[0]).toBe(4);
    expect(result[1].latlon[1]).toBe(5);
    expect(result[1].latlon[2]).toBe(6);
  });
  it("should return two chips for two selected amenities using getFilterChips", () => {
    const service: BusinessService = TestBed.get(BusinessService);

    bparams.amenities[0].checked = true;
    bparams.amenities[1].checked = true;
    const result: any = service.getFilterChips(bparams);

    expect(result[0].key).toBe("amenities");
    expect(result[1].key).toBe("amenities");
    expect(result[0].value).toBe("Amenity1");
    expect(result[1].value).toBe("Amenity2");
    expect(result[0].id).toBe(1);
    expect(result[1].id).toBe(2);
  });
  it("should return one chip for the selected businessType using getFilterChips", () => {
    const service: BusinessService = TestBed.get(BusinessService);

    bparams.business_types[1].selected = true;
    const result: any = service.getFilterChips(bparams);
    expect(result[0].key).toBe("business_types");
    expect(result[0].value).toBe("Type2");
    expect(result[0].id).toBe(2);
  });
  it("should set the business filter using setBusinessFilter", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service.getBusinessFilter()).toBeUndefined();
    service.setBusinessFilter(bparams);
    expect(service.getBusinessFilter()).toBeDefined();
    expect(service.getBusinessFilter().amenities.length).toBe(3);
  });
  it("should set the business filter amenities using setBusinessFilterAmenities", () => {
    let newAmenity = "Amenity4";
    const service: BusinessService = TestBed.get(BusinessService);

    expect(service.getBusinessFilter()).toBeUndefined();
    service.setBusinessFilter(bparams);
    bparams.amenities[0].tag = newAmenity;
    service.setBusinessFilterAmenities(bparams.amenities);
    expect(service.getBusinessFilter().amenities[0].tag).toBe(newAmenity);
  });
});
