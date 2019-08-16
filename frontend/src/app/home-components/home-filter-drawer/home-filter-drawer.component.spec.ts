import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

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
import { MockElementRef } from "src/app/testing/dummy_spies";
import { ElementRef } from "@angular/core";
import { defaultPrice } from "src/app/store/state/product";
import { IGFilters } from "src/app/models/general_filters";
import { IPFilters } from "src/app/models/product_filters";
import { defaultLatlonDis } from "src/app/store/state/general";

const activatedRouteStub = {
  paramMap: {
    subscribe() {
      return of();
    }
  }
};

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
      "dispatchSearchBusinesses"
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
      "dispatchSearchProducts"
    ]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFiltersCity",
      "setGeneralFiltersLatLon",
      "setGeneralFilters",
      "getGeneralFilters",
      "setShowBusinesses",
      "getShowBusinesses",
      "getGeneralFilters",
      "updateDefaultLatLonDis"
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

    geoLocationServiceSpy = jasmine.createSpyObj("GeoLocationService", [
      "getSearchCities",
      "getPosition"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["getSelectedTypeID"]);

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
    expect(geoLocationServiceSpy.getSearchCities).toHaveBeenCalled();
  });

  it("should call getSearchCities subscribe using getLocationLatLon", () => {
    const observableParam = cold("a|", { a: { place: { formatted_address: "MU,CU" } } });
    geoLocationServiceSpy.getSearchCities.and.returnValue(observableParam);
    component.getLocationLatLon();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(generalServiceSpy.setGeneralFiltersLatLon).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFiltersCity).toHaveBeenCalledWith("MU");
  });
});
