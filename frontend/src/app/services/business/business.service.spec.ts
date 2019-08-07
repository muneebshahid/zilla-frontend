import { IBFilters } from "src/app/models/business_filters";
import { TestBed } from "@angular/core/testing";

import { BusinessService } from "./business.service";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { StoreModule, Store } from "@ngrx/store";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { IGFilters } from "src/app/models/general_filters";
import { defaultLatlonDis } from "src/app/store/state/general";
import { dummyBusinessTypes, dummyAmenities, businessObj } from "src/app/testing/models";
import { IAppState } from "src/app/store/state/app.state";
import { LocationService } from "../location/location.service";
import { FiltersService } from "../filters/filters.service";
import {
  GetBusinessAmenities,
  GetBusinessTypes,
  GetSearchBusiness,
  UpdateBusinessFilters,
  GetBusinessDetail
} from "src/app/store/actions/business";
import { HttpService } from "../http/http.service";
import { of } from "rxjs";

describe("BusinessService", () => {
  let bparams: IBFilters;
  let gparams: IGFilters;
  let store: Store<IAppState>;

  let locationServiceSpy;
  let filterServiceSpy;
  let httpServiceSpy;

  beforeEach(() => {
    locationServiceSpy = jasmine.createSpyObj("LocationService", ["setDetailLocation"]);
    filterServiceSpy = jasmine.createSpyObj("FiltersService", [
      "typeFilterSelected",
      "tagFilterSelected",
      "getSelectedTagsCSVs",
      "getSelectedTypeID",
      "getSelectedTypeIDObject",
      "getSelectedTagsObjs"
    ]);
    httpServiceSpy = jasmine.createSpyObj("HttpService", ["get"]);

    httpServiceSpy.get.and.returnValue(of());
    locationServiceSpy.setDetailLocation.and.returnValue(null);
    filterServiceSpy.typeFilterSelected.and.callThrough();
    filterServiceSpy.tagFilterSelected.and.callThrough();
    filterServiceSpy.getSelectedTagsObjs.and.callThrough();
    filterServiceSpy.getSelectedTagsCSVs.and.callThrough();
    filterServiceSpy.getSelectedTypeIDObject.and.callThrough();
    filterServiceSpy.getSelectedTypeID.and.callThrough();

    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: LocationService, useValue: locationServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy },
        { provide: HttpService, useValue: httpServiceSpy }
      ]
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

    store = TestBed.get(Store);

    spyOn(store, "dispatch").and.callThrough();
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
    filterServiceSpy.getSelectedTagsCSVs.and.returnValue("3");
    filterServiceSpy.getSelectedTypeID.and.returnValue(null);

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
    filterServiceSpy.getSelectedTagsCSVs.and.returnValue("");
    filterServiceSpy.getSelectedTypeID.and.returnValue(null);

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
    filterServiceSpy.getSelectedTagsCSVs.and.returnValue("");
    filterServiceSpy.getSelectedTypeID.and.returnValue(3);

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
    filterServiceSpy.getSelectedTagsCSVs.and.returnValue("");
    filterServiceSpy.getSelectedTypeID.and.returnValue(null);

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
    filterServiceSpy.getSelectedTypeIDObject.and.returnValue(null);
    filterServiceSpy.getSelectedTagsObjs.and.returnValue([
      { tag: "Amenity1", id: 1, checked: false },
      { tag: "Amenity2", id: 2, checked: false }
    ]);

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
    filterServiceSpy.getSelectedTypeIDObject.and.returnValue({
      name: "Type2",
      id: 2,
      selected: true
    });
    filterServiceSpy.getSelectedTagsObjs.and.returnValue([]);

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

  it("should set the business filter types using setBusinessFilterTypes", () => {
    let newType = "Type4";
    const service: BusinessService = TestBed.get(BusinessService);

    expect(service.getBusinessFilter()).toBeUndefined();
    service.setBusinessFilter(bparams);
    bparams.business_types[0].name = newType;
    service.setBusinessFilterTypes(bparams.business_types);
    expect(service.getBusinessFilter().business_types[0].name).toBe(newType);
  });

  it("should set the business field as a new field using setBusinesses", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service.getBusinessFilter()).toBeUndefined();
    service.setBusinessFilter(bparams);

    const markers: any = service.getMarkersFromPayload(businessObj);
    const businesses: any = businessObj;

    service.setBusinesses(businesses, markers);
    expect(service.getBusinesses().length).toBe(2);
  });

  it("should concat the business field as a new field using setBusinesses", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service.getBusinessFilter()).toBeUndefined();
    service.setBusinessFilter(bparams);

    const markers: any = service.getMarkersFromPayload(businessObj);
    const markersNew: any = service.getMarkersFromPayload(businessObj);
    const businesses: any = businessObj;
    const businessesNew: any = businessObj;

    service.setBusinesses(businesses, markers);
    expect(service.getBusinesses().length).toBe(2);

    bparams.paginate = true;
    service.setBusinessFilter(bparams);

    service.setBusinesses(businessesNew, markersNew);
    expect(service.getBusinesses().length).toBe(4);
  });

  it("should set the pending detail ID using setPendingDetailID", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service.getPendingDetailID()).toBeNull();
    service.setPendingDetailID(5);
    expect(service.getPendingDetailID()).toBe(5);
  });

  it("should set business hits using setBusinessHits", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    expect(service.getBusinessHits()).toBeUndefined();
    service.setBusinessHits(5);
    expect(service.getBusinessHits()).toBe(5);
  });
  it("should dispatch 2 actions to one get Amenities and other to get BusinessTypes using getBusinessFilterData", () => {
    const amenitiesAction = new GetBusinessAmenities();
    const businessTypesAction = new GetBusinessTypes();

    const service: BusinessService = TestBed.get(BusinessService);
    service.getBusinessFilterData();
    expect(store.dispatch).toHaveBeenCalledWith(amenitiesAction);
    expect(store.dispatch).toHaveBeenCalledWith(businessTypesAction);
  });
  it("should dispatch search business action with correct general and business filters using dispatchSearchBusinesses", () => {
    const searchBusinessAction = new GetSearchBusiness({
      businessParams: bparams,
      generalParams: gparams
    });
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    service.dispatchSearchBusinesses(gparams);
    expect(store.dispatch).toHaveBeenCalledWith(searchBusinessAction);
  });
  it("should dispatch update business filter action with updateBusinessFilters", () => {
    const updateBusinessFilterAction = new UpdateBusinessFilters(bparams);
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    service.updateBusinessFilters();
    expect(store.dispatch).toHaveBeenCalledWith(updateBusinessFilterAction);
  });
  it("should dispatch GetBusinessDetail action and change the URL with dispatchGetBusinessDetail", () => {
    const getBusinessDetailAction = new GetBusinessDetail({ id: 1 });
    const service: BusinessService = TestBed.get(BusinessService);
    service.dispatchGetBusinessDetail(1);
    expect(store.dispatch).toHaveBeenCalledWith(getBusinessDetailAction);
    expect(locationServiceSpy.setDetailLocation).toHaveBeenCalled();
  });
  it("should check if the businessFilter values are set to default using filterChanged", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    let filterChanged = service.filterChanged();
    expect(filterChanged).toBe(false);
  });

  it("should check the currently shown business id using checkBusinessShownByID", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    const markers: any = service.getMarkersFromPayload(businessObj);

    service.setBusinessFilter(bparams);
    service.setBusinesses(businessObj, markers);
    let businessIDFound = service.checkBusinessShownByID(0);
    let businessIDNotFound = service.checkBusinessShownByID(99);

    expect(businessIDFound).toBe(true);
    expect(businessIDNotFound).toBe(false);
  });

  it("should make an http call for getting search businesses using getSearchBusinesses", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    let serverResponse = service.getSearchBusinesses({
      businessParams: bparams,
      generalParams: gparams
    });
    expect(serverResponse).toBe(of());
  });

  it("should make an http call for getting business detail using getBusinessDetail", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    let serverResponse = service.getBusinessDetail(5);
    expect(serverResponse).toBe(of());
  });

  it("should make an http call for getting business types using getBusinesstypes", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    let serverResponse = service.getBusinesstypes();
    expect(serverResponse).toBe(of());
  });

  it("should make an http call for getting business amenities using getBusinessAmenities", () => {
    const service: BusinessService = TestBed.get(BusinessService);
    service.setBusinessFilter(bparams);
    let serverResponse = service.getBusinessAmenities();
    expect(serverResponse).toBe(of());
  });
});
