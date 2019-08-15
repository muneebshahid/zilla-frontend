import { ElementRef } from "@angular/core";

export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}

export const dummyFilterServiceSpy = jasmine.createSpyObj("FilterService", ["selectTypeInFilter"]);

export const dummyGeneralServiceSpy = jasmine.createSpyObj("GeneralService", [
  "setGeneralFiltersCity",
  "setGeneralFiltersLatLon",
  "setGeneralFilters",
  "setShowBusinesses",
  "getShowBusinesses",
  "getGeneralFilters"
]);

export const dummyProductServiceSpy = jasmine.createSpyObj("ProductService", [
  "getProductFilterData",
  "setProductFilters",
  "getProductFilterTags",
  "getProductFilterTypes",
  "setProductFilterTags",
  "setProductFilterTypes",
  "getProductFilters",
  "updateProductFilters",
  "dispatchSearchProducts"
]);

export const dummyBusinessServiceSpy = jasmine.createSpyObj("BusinessService", [
  "getBusinessFilterData",
  "setBusinessFilter",
  "getBusinessFilterAmenities",
  "getBusinessFilterTypes",
  "setBusinessFilterTypes",
  "setBusinessFilterAmenities",
  "setPendingDetailID",
  "getBusinessFilter",
  "updateBusinessFilters",
  "dispatchSearchBusinesses"
]);

export const dummyMapComponentSpy = jasmine.createSpyObj("MapComponent", ["setFocusLocation"]);
