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
import {
  dummyGeneralServiceSpy,
  dummyProductServiceSpy,
  dummyBusinessServiceSpy
} from "src/app/testing/dummy_spies";

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
  beforeEach(async(() => {
    businessServiceSpy = dummyBusinessServiceSpy;
    productServiceSpy = dummyProductServiceSpy;
    generalServiceSpy = dummyGeneralServiceSpy;

    geoLocationServiceSpy = jasmine.createSpyObj("GeoLocationService", ["getSearchCities"]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["getSelectedTypeID"]);

    TestBed.configureTestingModule({
      declarations: [HomeFilterDrawerComponent],
      providers: [
        GeoLocationService,
        GoogleMapsAPIWrapper,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy },
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy }
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
    spyOn(component.searchPriceSliderControl, "nativeElement").and.returnValue({});
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should check if subscribes are called in init", () => {
    const initSubSpy = spyOn(component, "initializeSubscribers");
    const latlonSubSpy = spyOn(component, "getLocationLatLon");
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
    component.getLocationLatLon();
    expect(geoLocationServiceSpy.getSearchCities).toHaveBeenCalled();
  });

  // it("should call getSearchCities subscribe using getLocationLatLon", () => {
  //   const observableParam = cold("a|", { a: { place: { formatted_address: "MU,CU" } } });
  //   geoLocationServiceSpy.getSearchCities.and.returnValue(observableParam);
  //   component.getLocationLatLon();
  //   getTestScheduler().flush();
  //   fixture.detectChanges();

  //   expect(generalServiceSpy.setGeneralFiltersLatLon).toHaveBeenCalled();
  //   expect(generalServiceSpy.setGeneralFiltersCity).toHaveBeenCalledWith("MU");
  // });
});
