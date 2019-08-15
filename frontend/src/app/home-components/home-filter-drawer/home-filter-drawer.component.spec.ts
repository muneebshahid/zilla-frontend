import { FormsModule } from "@angular/forms";
import { async, ComponentFixture, TestBed } from "@angular/core/testing";

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
  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "getBusinessFilterData",
      "setBusinessFilter",
      "getBusinessFilterAmenities",
      "getBusinessFilterTypes"
    ]);
    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "getProductFilterData",
      "setProductFilters",
      "getProductFilterTags"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["getSelectedTypeID"]);

    TestBed.configureTestingModule({
      declarations: [HomeFilterDrawerComponent],
      providers: [
        GeoLocationService,
        GoogleMapsAPIWrapper,
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: ProductService, useValue: productServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy },
        { provide: BusinessService, useValue: businessServiceSpy }
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
});
