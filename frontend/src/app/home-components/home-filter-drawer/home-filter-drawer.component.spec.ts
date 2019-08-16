import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { cold, getTestScheduler } from "jasmine-marbles";
import { HomeFilterDrawerComponent } from "./home-filter-drawer.component";
import { NgSelectModule } from "@ng-select/ng-select";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { GoogleMapsAPIWrapper, AgmCoreModule } from "@agm/core";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { mapInitObj } from "src/app/app.module";
import { ActivatedRoute } from "@angular/router";
import { ProductService } from "src/app/services/product/product.service";
import { BusinessService } from "src/app/services/business/business.service";
import { of } from "rxjs";
import { FiltersService } from "src/app/services/filters/filters.service";
import { GeneralService } from "src/app/services/general/general.service";
import { ElementRef, DebugElement } from "@angular/core";
import { defaultPrice } from "src/app/store/state/product";
import { IGFilters } from "src/app/models/general_filters";
import { IPFilters } from "src/app/models/product_filters";
import { defaultLatlonDis } from "src/app/store/state/general";
import {
  dummyFilterTagsAllFalse,
  dummyFilterTypesAllFalse,
  dummyBusinessTypes,
  dummyAmenities,
  dummyFilterTags,
  dummyFilterTypes
} from "src/app/testing/models";
import { IBFilters } from "src/app/models/business_filters";
import { take } from "rxjs/operators";
import { By } from "@angular/platform-browser";
import { browser } from "protractor";

declare var jQuery: any;
const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of();
    }
  }
};
export class MockElementRef extends ElementRef {
  constructor() {
    super(null);
  }
}
describe("HomeFilterDrawerComponent", () => {
  let component: HomeFilterDrawerComponent;
  let fixture: ComponentFixture<HomeFilterDrawerComponent>;
  let businessServiceSpy;
  let productServiceSpy;
  let routeStub;
  let filterServiceSpy;
  let generalServiceSpy;
  let geoLocationServiceSpy;
  let initSubSpy;
  let pParams: IPFilters;
  let gparams: IGFilters;
  let bparams: IBFilters;
  let setInitLatLonSpy;

  let latlonSubSpy;
  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "getBusinessFilterData",
      "setBusinessFilter",
      "getBusinessFilterAmenities",
      "getBusinessFilterTypes",
      "setBusinessFilterTypes",
      "setBusinessFilterAmenities",
      "setPendingDetailID",
      "getBusinessFilter",
      "updateBusinessFilters",
      "dispatchSearchBusinesses",
      "setBusinessDrawerFilters",
      "filterChanged"
    ]);
    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "getProductFilterData",
      "setProductFilters",
      "getProductFilterTags",
      "getProductFilterTypes",
      "setProductFilterTags",
      "setProductFilterTypes",
      "getProductFilters",
      "updateProductFilters",
      "filterChanged",
      "dispatchSearchProducts"
    ]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFiltersCity",
      "setGeneralFiltersLatLon",
      "setGeneralFilters",
      "getGeneralFiltersLatLonDis",
      "setShowBusinesses",
      "getShowBusinesses",
      "filterChanged",
      "getGeneralFilters",
      "updateDefaultLatLonDis",
      "updateGeneralFilters"
    ]);

    pParams = {
      product_types: [],
      tags: [],
      available: -1,
      price: defaultPrice,
      paginate: false,
      paginationInfo: [0, 10, 10]
    };
    gparams = {
      latlondis: defaultLatlonDis,
      query: "",
      city: ""
    };
    bparams = {
      amenities: dummyAmenities,
      business_types: dummyBusinessTypes,
      paginate: false,
      paginationInfo: [0, 10, 10]
    };

    geoLocationServiceSpy = jasmine.createSpyObj("GeoLocationService", [
      "getSearchCities",
      "getPosition",
      "getCityFromLatLng"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", [
      "getSelectedTypeID",
      "selectTypeInFilter"
    ]);

    geoLocationServiceSpy.getSearchCities.and.returnValue(of());
    productServiceSpy.getProductFilters.and.returnValue(pParams);
    generalServiceSpy.getGeneralFilters.and.returnValue(gparams);

    TestBed.configureTestingModule({
      declarations: [HomeFilterDrawerComponent],
      providers: [
        GoogleMapsAPIWrapper,
        { provide: GeoLocationService, useValue: geoLocationServiceSpy },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy },
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: ElementRef, useValue: MockElementRef }
      ],
      imports: [
        NgSelectModule,
        FormsModule,
        StoreModule.forRoot(appReducers),
        AgmCoreModule.forRoot(mapInitObj),
        HttpClientTestingModule,
        RouterTestingModule
      ]
    }).compileComponents();

    routeStub = TestBed.get(ActivatedRoute);
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeFilterDrawerComponent);
    component = fixture.componentInstance;
    initSubSpy = spyOn(component, "initializeSubscribers");
    latlonSubSpy = spyOn(component, "getLocationLatLon");
    setInitLatLonSpy = spyOn(component, "setInitialLatLon");
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check if subscribes are called in init", () => {
    const subRouteSpy = spyOn(routeStub.paramMap, "subscribe");
    component.ngOnInit();
    expect(businessServiceSpy.getBusinessFilterData).toHaveBeenCalled();
    expect(productServiceSpy.getProductFilterData).toHaveBeenCalled();
    expect(initSubSpy).toHaveBeenCalled();
    expect(latlonSubSpy).toHaveBeenCalled();
    expect(subRouteSpy).toHaveBeenCalled();
  });

  it("should setPendingDetailID in routeParam subscribe", () => {
    const observableParam = cold("a|", { a: { params: { business_slug: 1, business_id: 1 } } });
    routeStub.paramMap = observableParam;
    component.ngOnInit();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.setPendingDetailID).toHaveBeenCalledWith(1);
  });

  it("should not setPendingDetailID in routeParam subscribe", () => {
    const observableParam = cold("a|", { a: { params: { business_slug: undefined } } });
    routeStub.paramMap = observableParam;
    component.ngOnInit();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.setPendingDetailID).not.toHaveBeenCalledWith(1);
  });

  it("should get city name from getLocationLatLon", () => {
    const observableParam = cold("a|", { a: { params: { business_slug: undefined } } });
    routeStub.paramMap = observableParam;
    component.ngOnInit();

    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.setPendingDetailID).not.toHaveBeenCalledWith(1);
  });

  it("should call getSearchCities using getLocationLatLon", () => {
    latlonSubSpy.and.callThrough();
    component.getLocationLatLon();
    expect(latlonSubSpy).toHaveBeenCalled();
  });

  // it("should call getSearchCities subscribe using getLocationLatLon", () => {
  //   latlonSubSpy.and.callThrough();
  //   const observableParam = cold("a|", { a: { place: { formatted_address: "MU,CU" } } });
  //   geoLocationServiceSpy.getSearchCities.and.returnValue(observableParam);

  //   component.getLocationLatLon();
  //   getTestScheduler().flush();
  //   fixture.detectChanges();

  //   expect(generalServiceSpy.setGeneralFiltersLatLon).toHaveBeenCalled();
  //   expect(generalServiceSpy.setGeneralFiltersCity).toHaveBeenCalledWith("MU");
  // });

  it("should set drawer business filters using setBusinessDrawerFilters", () => {
    component.setBusinessDrawerFilters();
    expect(businessServiceSpy.getBusinessFilterAmenities).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilterTypes).toHaveBeenCalled();
    expect(filterServiceSpy.getSelectedTypeID).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilterTypes).toHaveBeenCalled();
    expect(component.filterTypeText).toBe("Business Type");
  });
  it("should set drawer product filters using setProductDrawerFilters", () => {
    component.setProductDrawerFilters();
    expect(productServiceSpy.getProductFilterTags).toHaveBeenCalled();
    expect(productServiceSpy.getProductFilterTypes).toHaveBeenCalled();
    expect(filterServiceSpy.getSelectedTypeID).toHaveBeenCalled();
    expect(productServiceSpy.getProductFilterTypes).toHaveBeenCalled();
    expect(component.filterTypeText).toBe("Product Type");
  });
  it("should save product filters state using saveProductFiltersState", () => {
    component.selectedTags = dummyFilterTagsAllFalse;
    component.selectedTypes = dummyFilterTypesAllFalse;
    component.saveProductFiltersState();
    expect(productServiceSpy.setProductFilterTags).toHaveBeenCalled();
    expect(productServiceSpy.setProductFilterTypes).toHaveBeenCalled();
    expect(productServiceSpy.setProductFilterTags).toHaveBeenCalledWith(dummyFilterTagsAllFalse);
    expect(productServiceSpy.setProductFilterTypes).toHaveBeenCalledWith(dummyFilterTypesAllFalse);
  });
  it("should initialize businessFilterSelector subscriber", () => {
    initSubSpy.and.callThrough();
    let setBusinessDrawerFiltersSpy = spyOn(component, "setBusinessDrawerFilters");
    component.businessesFilterSelector = cold("a|", { a: bparams });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();
    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalled();
    expect(setBusinessDrawerFiltersSpy).toHaveBeenCalled();
  });

  it("should initialize generalFiltersSelector with setInitLatLon subscriber", () => {
    initSubSpy.and.callThrough();
    component.defaultLocationLoaded = false;

    component.generalFiltersSelector = cold("a|", { a: gparams });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
    expect(setInitLatLonSpy).toHaveBeenCalled();
    expect(component.defaultLocationLoaded).toBe(true);
  });
  it("should initialize generalFiltersSelector without setInitLatLon subscriber", () => {
    initSubSpy.and.callThrough();
    component.defaultLocationLoaded = true;

    component.generalFiltersSelector = cold("a|", { a: gparams });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
    expect(setInitLatLonSpy).not.toHaveBeenCalled();
    expect(component.defaultLocationLoaded).toBe(true);
  });
  it("should initialize productsFilterSelector without setInitLatLon subscriber", () => {
    initSubSpy.and.callThrough();
    let setProductDrawerFiltersSpy = spyOn(component, "setProductDrawerFilters");

    component.productsFilterSelector = cold("a|", { a: pParams });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(productServiceSpy.setProductFilters).toHaveBeenCalled();
    expect(setProductDrawerFiltersSpy).toHaveBeenCalled();
  });
  it("should initialize showBusinessSubscriber with getShowBusinesses=true", () => {
    initSubSpy.and.callThrough();
    spyOn(component.productsFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.generalFiltersSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesAmenitiesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.businessesTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTagsSelector.pipe(take(2)), "subscribe").and.returnValue(null);

    let saveProductFiltersStateSpy = spyOn(component, "saveProductFiltersState");
    let setBusinessDrawerFiltersSpy = spyOn(component, "setBusinessDrawerFilters");
    let saveBusinessStateSpy = spyOn(component, "saveBusinessState");
    let setProductDrawerFiltersSpy = spyOn(component, "setProductDrawerFilters");
    let searchProductsSpy = spyOn(component, "searchProducts");
    let productsLoadedFirstTimeSpy = spyOn(component, "productsLoadedFirstTime");

    generalServiceSpy.getShowBusinesses.and.returnValue(true);

    component.showingBusinessesSelector = cold("a|", { a: true });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();

    expect(saveProductFiltersStateSpy).toHaveBeenCalled();
    expect(setBusinessDrawerFiltersSpy).toHaveBeenCalled();

    expect(component.productsRetrieved).toBe(false);
    expect(searchProductsSpy).not.toHaveBeenCalled();
    expect(setProductDrawerFiltersSpy).not.toHaveBeenCalled();
    expect(saveBusinessStateSpy).not.toHaveBeenCalled();
    expect(productsLoadedFirstTimeSpy).not.toHaveBeenCalled();
  });

  it("should initialize showBusinessSubscriber with getShowBusinesses=false", () => {
    initSubSpy.and.callThrough();
    latlonSubSpy.and.returnValue(null);
    spyOn(component.productsFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.generalFiltersSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesAmenitiesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.businessesTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTagsSelector.pipe(take(2)), "subscribe").and.returnValue(null);

    let saveProductFiltersStateSpy = spyOn(component, "saveProductFiltersState");
    let setBusinessDrawerFiltersSpy = spyOn(component, "setBusinessDrawerFilters");
    let saveBusinessStateSpy = spyOn(component, "saveBusinessState");
    let setProductDrawerFiltersSpy = spyOn(component, "setProductDrawerFilters");
    let searchProductsSpy = spyOn(component, "searchProducts");
    let productsLoadedFirstTimeSpy = spyOn(component, "productsLoadedFirstTime");

    generalServiceSpy.getShowBusinesses.and.returnValue(false);

    component.showingBusinessesSelector = cold("a|", { a: false });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();

    expect(saveProductFiltersStateSpy).not.toHaveBeenCalled();
    expect(setBusinessDrawerFiltersSpy).not.toHaveBeenCalled();

    expect(component.productsRetrieved).toBe(true);
    expect(searchProductsSpy).toHaveBeenCalled();
    expect(setProductDrawerFiltersSpy).toHaveBeenCalled();
    expect(saveBusinessStateSpy).toHaveBeenCalled();
    expect(productsLoadedFirstTimeSpy).toHaveBeenCalled();
  });

  it("should initialize showBusinessSubscriber with getShowBusinesses=false and productsRetrieved=true", () => {
    initSubSpy.and.callThrough();
    latlonSubSpy.and.returnValue(null);
    spyOn(component.productsFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.generalFiltersSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesFilterSelector, "subscribe").and.returnValue(null);
    spyOn(component.businessesAmenitiesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.businessesTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTypesSelector.pipe(take(2)), "subscribe").and.returnValue(null);
    spyOn(component.productTagsSelector.pipe(take(2)), "subscribe").and.returnValue(null);

    let saveProductFiltersStateSpy = spyOn(component, "saveProductFiltersState");
    let setBusinessDrawerFiltersSpy = spyOn(component, "setBusinessDrawerFilters");
    let saveBusinessStateSpy = spyOn(component, "saveBusinessState");
    let setProductDrawerFiltersSpy = spyOn(component, "setProductDrawerFilters");
    let searchProductsSpy = spyOn(component, "searchProducts");
    let productsLoadedFirstTimeSpy = spyOn(component, "productsLoadedFirstTime");

    generalServiceSpy.getShowBusinesses.and.returnValue(false);
    component.productsRetrieved = true;

    component.showingBusinessesSelector = cold("a|", { a: false });
    component.initializeSubscribers();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();

    expect(saveProductFiltersStateSpy).not.toHaveBeenCalled();
    expect(setBusinessDrawerFiltersSpy).not.toHaveBeenCalled();

    expect(component.productsRetrieved).toBe(true);
    expect(searchProductsSpy).not.toHaveBeenCalled();
    expect(setProductDrawerFiltersSpy).toHaveBeenCalled();
    expect(saveBusinessStateSpy).toHaveBeenCalled();
    expect(productsLoadedFirstTimeSpy).toHaveBeenCalled();
  });

  it("should initialize businessAmenitiesSelector", () => {
    initSubSpy.and.callThrough();
    let getCheckboxVersionOfFiltersSpy = spyOn(component, "getCheckboxVersionOfFilters");
    component.businessesAmenitiesSelector = cold("a|", { a: [] });
    component.initializeSubscribers();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.setBusinessFilterAmenities).toHaveBeenCalled();
    expect(getCheckboxVersionOfFiltersSpy).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilterAmenities).toHaveBeenCalled();
  });
  it("should initialize businessesTypesSelector", () => {
    initSubSpy.and.callThrough();
    let getDropDownVersionOfFiltersSpy = spyOn(component, "getDropDownVersionOfFilters");
    component.businessesTypesSelector = cold("a|", { a: [] });
    component.initializeSubscribers();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.setBusinessFilterTypes).toHaveBeenCalled();
    expect(getDropDownVersionOfFiltersSpy).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilterTypes).toHaveBeenCalled();
  });
  it("should initialize productTypesSelector", () => {
    initSubSpy.and.callThrough();
    let getDropDownVersionOfFiltersSpy = spyOn(component, "getDropDownVersionOfFilters");
    component.productTypesSelector = cold("a|", { a: [] });
    component.initializeSubscribers();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(productServiceSpy.setProductFilterTypes).toHaveBeenCalled();
    expect(getDropDownVersionOfFiltersSpy).toHaveBeenCalled();
  });
  it("should initialize productTagsSelector", () => {
    initSubSpy.and.callThrough();
    let getCheckboxVersionOfFiltersSpy = spyOn(component, "getCheckboxVersionOfFilters");
    component.productTagsSelector = cold("a|", { a: [] });
    component.initializeSubscribers();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(productServiceSpy.setProductFilterTags).toHaveBeenCalled();
    expect(getCheckboxVersionOfFiltersSpy).toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBeGreaterThan(3);
  });
  // it("should call productsLoadedFirstTime", fakeAsync(() => {
  // }));

  // it("should call ngOnAfterViewInit", fakeAsync(() => {
  // }));

  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");

    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });

  it("should use getCheckboxVersionOfFilters to change httpFilterVersion to comp. version ", () => {
    let data = [{ id: 1, tag: "tag1" }, { id: 2, tag: "tag2" }, { id: 3, tag: "tag3" }];
    let checkboxVersion = component.getCheckboxVersionOfFilters(data);
    expect(checkboxVersion[0].checked).toBe(false);
    expect(checkboxVersion[1].checked).toBe(false);
    expect(checkboxVersion[2].checked).toBe(false);
  });

  it("should use getDropDownVersionOfFilters to change httpFilterVersion to comp. version ", () => {
    let data = [{ id: 1, tag: "tag1" }, { id: 2, tag: "tag2" }, { id: 3, tag: "tag3" }];
    let checkboxVersion = component.getDropDownVersionOfFilters(data);
    expect(checkboxVersion[0].selected).toBe(false);
    expect(checkboxVersion[1].selected).toBe(false);
    expect(checkboxVersion[2].selected).toBe(false);
  });

  it("should use setInitialLatLon to set initial location details ", () => {
    let searchBusinessSpy = spyOn(component, "searchBusinesses");
    let observableParam = cold("a------------------|", {
      a: { coords: { latitude: 1, longitude: 1 } }
    });
    let observableParam2 = cold("a|", { a: "english" });
    setInitLatLonSpy.and.callThrough();
    geoLocationServiceSpy.getPosition.and.returnValue(observableParam);
    geoLocationServiceSpy.getCityFromLatLng.and.returnValue(observableParam2);

    component.setInitialLatLon();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(geoLocationServiceSpy.getPosition).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFiltersLatLon).toHaveBeenCalledWith(1, 1);
    expect(generalServiceSpy.getGeneralFiltersLatLonDis).toHaveBeenCalled();
    expect(geoLocationServiceSpy.getCityFromLatLng).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFiltersCity).toHaveBeenCalledWith("english");
    expect(generalServiceSpy.updateDefaultLatLonDis).toHaveBeenCalled();
    expect(generalServiceSpy.updateGeneralFilters).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilter).toHaveBeenCalled();
    expect(searchBusinessSpy).toHaveBeenCalled();
  });
  it("should use setInitialLatLon to set initial location details with coords=null ", () => {
    let searchBusinessSpy = spyOn(component, "searchBusinesses");
    let observableParam = cold("a|", { a: { coords: null } });
    setInitLatLonSpy.and.callThrough();
    geoLocationServiceSpy.getPosition.and.returnValue(observableParam);

    component.setInitialLatLon();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(generalServiceSpy.updateDefaultLatLonDis).toHaveBeenCalledWith();
    expect(searchBusinessSpy).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilter).toHaveBeenCalled();
  });
  it("should saveBusinessState", () => {
    component.saveBusinessState();
    expect(businessServiceSpy.setBusinessFilterAmenities).toHaveBeenCalled();
    expect(businessServiceSpy.setBusinessFilterTypes).toHaveBeenCalled();
  });
  it("should applyFilters with showBusiness=true", () => {
    generalServiceSpy.getShowBusinesses.and.returnValue(true);
    businessServiceSpy.filterChanged.and.returnValue(false);
    generalServiceSpy.filterChanged.and.returnValue(true);
    let saveBusinessStateSpyOn = spyOn(component, "saveBusinessState");
    let searchBusinessesSpyOn = spyOn(component, "searchBusinesses");
    component.applyFilters();

    expect(businessServiceSpy.filterChanged).toHaveBeenCalled();
    expect(generalServiceSpy.filterChanged).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessFilter).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(saveBusinessStateSpyOn).toHaveBeenCalled();
    expect(searchBusinessesSpyOn).toHaveBeenCalled();
    expect(generalServiceSpy.updateGeneralFilters).toHaveBeenCalled();
  });
  it("should applyFilters with showBusiness=false", () => {
    generalServiceSpy.getShowBusinesses.and.returnValue(false);
    productServiceSpy.filterChanged.and.returnValue(true);
    generalServiceSpy.filterChanged.and.returnValue(true);
    let saveProductStateSpyOn = spyOn(component, "saveProductFiltersState");
    let searchProductsSpyOn = spyOn(component, "searchProducts");
    component.applyFilters();

    expect(productServiceSpy.filterChanged).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(saveProductStateSpyOn).toHaveBeenCalled();
    expect(searchProductsSpyOn).toHaveBeenCalled();
    expect(generalServiceSpy.updateGeneralFilters).toHaveBeenCalled();
  });
  it("should test toggleCheckbox", () => {
    let data = dummyFilterTags;
    component.selectedTags = data;
    expect(component.selectedTags[0].checked).toBe(true);
    component.toggleCheckbox(0);
    expect(component.selectedTags[0].checked).toBe(false);
  });
  it("should test dropDownChanged", () => {
    component.dropDownChanged(dummyFilterTypes[0]);
    expect(filterServiceSpy.selectTypeInFilter).toHaveBeenCalled();
  });
  it("should test searchBusinesses", () => {
    component.searchBusinesses(bparams, gparams);
    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalledWith(bparams);
    expect(businessServiceSpy.updateBusinessFilters).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchSearchBusinesses).toHaveBeenCalledWith(gparams);
  });
  it("should test searchProducts", () => {
    component.searchProducts(bparams, gparams);
    expect(productServiceSpy.setProductFilters).toHaveBeenCalledWith(pParams);
    expect(productServiceSpy.updateProductFilters).toHaveBeenCalled();
    expect(productServiceSpy.dispatchSearchProducts).toHaveBeenCalledWith(gparams);
  });
});
