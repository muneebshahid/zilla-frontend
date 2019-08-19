import { ProductInfoComponent } from "./../../general-components/product-info/product-info.component";
import {
  HomeDrawersContainerComponent,
  BusinessInfoComponent,
  MapComponent,
  HomeFilterDrawerComponent,
  MFilterMapMenuComponent
} from "./../../testing/dummy_components";
import { async, ComponentFixture, TestBed, tick, fakeAsync } from "@angular/core/testing";

import { HomeListingsComponent } from "./home-listings.component";
import { InfiniteScrollModule } from "ngx-infinite-scroll";
import { StoreModule } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { ProductService } from "src/app/services/product/product.service";
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";
import { FiltersService } from "src/app/services/filters/filters.service";
import { cold, getTestScheduler } from "jasmine-marbles";
import {
  markerFromPayloadDummy,
  dummyFilterChip,
  businessObj,
  dummymarkers
} from "src/app/testing/models";
import { of } from "rxjs";

describe("HomeListingsComponent", () => {
  let component: HomeListingsComponent;
  let fixture: ComponentFixture<HomeListingsComponent>;
  let mapComponent;
  let businessServiceSpy;
  let productServiceSpy;
  let generalServiceSpy;
  let filterServiceSpy;
  beforeEach(async(() => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "getBusinessesMarkers",
      "setBusinessHits",
      "getBusinessHits",
      "getFilterChips",
      "setBusinessFilter",
      "getBusinessFilter",
      "updateBusinessFilters",
      "dispatchSearchBusinesses",
      "getMarkersFromPayload"
    ]);
    productServiceSpy = jasmine.createSpyObj("ProductService", [
      "getProductMarkers",
      "setProductHits",
      "getProductHits",
      "getFilterChips",
      "setProductFilters",
      "getProductFilters",
      "setProductFilterPrice",
      "getDefaultProductFilters",
      "updateProductFilters",
      "dispatchSearchProducts",
      "getProducts"
    ]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setShowBusinesses",
      "getShowBusinesses",
      "getFilterChips",
      "setGeneralFilters",
      "getGeneralFilters",
      "removeGeneralFilter",
      "updateGeneralFilters",
      "updateSearchType"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FiltersService", [
      "deSelectTagFilter",
      "deSelectTypeInFilter"
    ]);

    generalServiceSpy.getShowBusinesses.and.returnValue(true);
    businessServiceSpy.getBusinessesMarkers.and.returnValue(null);
    businessServiceSpy.getBusinessHits.and.returnValue(21);
    productServiceSpy.getProductHits.and.returnValue(22);
    filterServiceSpy.deSelectTagFilter.and.callThrough();
    filterServiceSpy.deSelectTypeInFilter.and.callThrough();

    TestBed.configureTestingModule({
      declarations: [
        HomeListingsComponent,
        HomeFilterDrawerComponent,
        MFilterMapMenuComponent,
        ProductInfoComponent,
        BusinessInfoComponent,
        HomeDrawersContainerComponent
      ],
      imports: [
        InfiniteScrollModule,
        StoreModule.forRoot(appReducers),
        HttpClientTestingModule,
        RouterTestingModule
      ],
      providers: [
        { provide: ProductService, useValue: productServiceSpy },
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeListingsComponent);
    component = fixture.componentInstance;
    mapComponent = new MapComponent();
    component.mapComponent = mapComponent;
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });

  it("should add subscribers to subscriptionArray", () => {
    component.ngOnInit();
    expect(component.subscriptionsArr.length).toBeGreaterThan(7);
  });
  it("should check subscription code for businessMarkersSelector", () => {
    const observableParam = cold("a|", { a: markerFromPayloadDummy });
    let markerSpy = spyOn(component, "putMarkersOnMap");
    component.businessMarkersSelector = observableParam;
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.mapComponent.markers.length).toBe(0);
    expect(businessServiceSpy.getBusinessesMarkers).toHaveBeenCalled();
    expect(markerSpy).toHaveBeenCalled();
  });
  it("should check subscription code for productMarkersSelector", () => {
    const observableParam = cold("a|", { a: markerFromPayloadDummy });
    let markerSpy = spyOn(component, "putMarkersOnMap");
    component.productMarkersSelector = observableParam;
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(component.mapComponent.markers.length).toBe(0);
    expect(productServiceSpy.getProductMarkers).toHaveBeenCalled();
    expect(markerSpy).toHaveBeenCalled();
  });
  it("should check subscription code for businessNumHitSelector", fakeAsync(() => {
    let zoneSpy = spyOn(component.ngZone, "run").and.callThrough();
    const observableParam = cold("a|", { a: 400 });
    component.businessNumHitSelector = observableParam;
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(businessServiceSpy.setBusinessHits).toHaveBeenCalled();
    expect(zoneSpy).toHaveBeenCalled();
    tick(1000);
    expect(component.hits).toBe(400);
  }));
  it("should check subscription code for productsNumHitSelector", () => {
    const observableParam = cold("a|", { a: 400 });
    component.productsNumHitSelector = observableParam;
    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();
    expect(productServiceSpy.setProductHits).toHaveBeenCalled();
    expect(component.hits).toBe(400);
  });
  it("should check subscription code for showingBusinessesSelector", () => {
    let putMarkerSpy = spyOn(component, "putMarkersOnMap");
    businessServiceSpy.getBusinessesMarkers.and.returnValue([]);

    const observableParam = cold("a|", { a: true });
    component.showingBusinessesSelector = observableParam;
    component.ngOnInit();
    component.businessFilterChips = dummyFilterChip;
    getTestScheduler().flush();
    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(component.selectedFilterChips).toBe(dummyFilterChip);
    expect(businessServiceSpy.getBusinessHits).toHaveBeenCalled();
    expect(component.hits).toBe(21);
    expect(businessServiceSpy.getBusinessesMarkers).toHaveBeenCalled();
    expect(putMarkerSpy).toHaveBeenCalled();
    expect(component.selectedCategory).toBe("Businesses");
  });
  it("should check subscription code for showingBusinessesSelector with false", () => {
    let putMarkerSpy = spyOn(component, "putMarkersOnMap");
    businessServiceSpy.getBusinessesMarkers.and.returnValue([]);
    generalServiceSpy.getShowBusinesses.and.returnValue(false);

    const observableParam = cold("a|", { a: false });
    component.showingBusinessesSelector = observableParam;
    component.ngOnInit();
    component.productFilterChips = dummyFilterChip;
    getTestScheduler().flush();

    expect(productServiceSpy.getProductHits).toHaveBeenCalled();
    expect(component.selectedCategory).toBe("Products");
    expect(businessServiceSpy.getBusinessesMarkers).toHaveBeenCalled();
    expect(component.hits).toBe(22);
    expect(putMarkerSpy).toHaveBeenCalled();

    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(component.selectedFilterChips).toBe(dummyFilterChip);
  });
  it("should check subscription code for businessFilterSelector", () => {
    businessServiceSpy.getFilterChips.and.returnValue(dummyFilterChip);
    const observableParam = cold("a|", { a: "" });
    component.businessFilterSelector = observableParam;

    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(businessServiceSpy.getFilterChips).toHaveBeenCalled();
    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalled();
    expect(component.selectedFilterChips[0].value).toBe("value1");
    expect(component.selectedFilterChips[1].value).toBe("value2");
    expect(component.selectedFilterChips[2].value).toBe("value3");
  });

  it("should check subscription code for productFilterSelector", () => {
    productServiceSpy.getFilterChips.and.returnValue(dummyFilterChip);
    const observableParam = cold("a|", { a: "" });
    component.productFilterSelector = observableParam;

    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(productServiceSpy.getFilterChips).toHaveBeenCalled();
    expect(productServiceSpy.setProductFilters).toHaveBeenCalled();
    expect(component.selectedFilterChips[0].value).toBe("value1");
    expect(component.selectedFilterChips[1].value).toBe("value2");
    expect(component.selectedFilterChips[2].value).toBe("value3");
  });
  it("should check subscription code for generalFilterSelector", () => {
    const observableParam = cold("a|", { a: "" });
    component.generalFilterSelector = observableParam;

    component.ngOnInit();
    getTestScheduler().flush();
    fixture.detectChanges();

    expect(generalServiceSpy.getFilterChips).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
  });
  it("should deSelectFilterFromOriginal with tagFilter", () => {
    let original = {
      amenities: [{ id: 1, tag: "tag1", checked: true }, { id: 2, tag: "tag2", checked: false }],
      business_types: [
        {
          id: 1,
          name: "name1",
          selected: false
        },
        {
          id: 2,
          name: "name2",
          selected: false
        }
      ],
      paginate: false,
      paginationInfo: [0, 10, 10]
    };

    let result = component.deSelectFilterFromOriginal("amenities", 1, original);
    expect(filterServiceSpy.deSelectTagFilter).toHaveBeenCalled();
  });
  it("should deSelectFilterFromOriginal with typeFilter ", () => {
    let original = {
      amenities: [{ id: 1, tag: "tag1", checked: true }, { id: 2, tag: "tag2", checked: false }],
      business_types: [
        {
          id: 1,
          name: "name1",
          selected: true
        },
        {
          id: 2,
          name: "name2",
          selected: false
        }
      ],
      paginate: false,
      paginationInfo: [0, 10, 10]
    };
    component.deSelectFilterFromOriginal("business_types", 1, original.business_types);
    expect(filterServiceSpy.deSelectTypeInFilter).toHaveBeenCalled();
  });
  it("should setShowBusinessCounter ", () => {
    component.setShownBusinessesCount(5);
    expect(component.numberOfShownBusinesses).toBe(5);
    expect(component.loadMoreEnabled).toBeFalsy();
  });
  it("should setShownProductsCount ", () => {
    component.setShownProductsCount(15);
    expect(component.numberOfShownProducts).toBe(15);
    expect(component.loadMoreEnabled).toBeFalsy();
  });

  it("should removeFilter for business", () => {
    let deSelectFilterFromOriginalSpy = spyOn(component, "deSelectFilterFromOriginal");
    component.selectedFilterChips = dummyFilterChip;
    component.removeFilter("key1", 1);

    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalledTimes(2);
    expect(businessServiceSpy.getBusinessFilter).toHaveBeenCalledTimes(1);
    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalledTimes(2);
    expect(businessServiceSpy.updateBusinessFilters).toHaveBeenCalledTimes(1);
    expect(businessServiceSpy.dispatchSearchBusinesses).toHaveBeenCalledTimes(1);
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalledTimes(1);

    expect(deSelectFilterFromOriginalSpy).toHaveBeenCalledTimes(1);
  });

  it("should removeFilter for products", () => {
    generalServiceSpy.getShowBusinesses.and.returnValue(false);
    let deSelectFilterFromOriginalSpy = spyOn(component, "deSelectFilterFromOriginal");
    component.selectedFilterChips = dummyFilterChip;
    component.removeFilter("key1", 1);

    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalledTimes(2);
    expect(productServiceSpy.getProductFilters).toHaveBeenCalledTimes(1);
    expect(deSelectFilterFromOriginalSpy).toHaveBeenCalledTimes(1);
    expect(productServiceSpy.setProductFilterPrice).not.toHaveBeenCalled();
    expect(productServiceSpy.getDefaultProductFilters).not.toHaveBeenCalled();
    expect(productServiceSpy.setProductFilters).toHaveBeenCalledTimes(3);
    expect(productServiceSpy.updateProductFilters).toHaveBeenCalledTimes(1);
    expect(productServiceSpy.dispatchSearchProducts).toHaveBeenCalledTimes(1);
  });

  it("should removeGeneralFilter", () => {
    component.removeGeneralFilter("abc");
    expect(generalServiceSpy.removeGeneralFilter).toHaveBeenCalled();
    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
    expect(generalServiceSpy.updateGeneralFilters).toHaveBeenCalled();
    expect(generalServiceSpy.getShowBusinesses).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchSearchBusinesses).toHaveBeenCalled();
    expect(generalServiceSpy.getGeneralFilters).toHaveBeenCalled();
    expect(productServiceSpy.dispatchSearchProducts).not.toHaveBeenCalled();
  });
  it("should setTemporaryMarker", () => {
    let markerOnMap = spyOn(component, "putMarkersOnMap");
    component.setTemporaryMarker(businessObj[0]);
    expect(markerOnMap).toHaveBeenCalled();
  });
  it("should removeTemporaryMarker", () => {
    let markerOnMap = spyOn(component, "putMarkersOnMap");
    component.removeTemporaryMarker();
    expect(markerOnMap).toHaveBeenCalled();
    expect(businessServiceSpy.getBusinessesMarkers).toHaveBeenCalled();
  });
  it("should use putMarkersOnMap function to put markers in array", () => {
    let createMarkerSpy = spyOn(component.mapComponent, "createMarker").and.returnValue(1);
    let dummyMarkers = [
      { latlon: [0, 1], id: 1 },
      { latlon: [1, 2], id: 2 },
      { latlon: [3, 4], id: 3 },
      { latlon: [5, 6], id: 4 }
    ];
    component.putMarkersOnMap(dummyMarkers);
    expect(component.mapComponent.markers.length).toBeGreaterThan(0);
    expect(createMarkerSpy).toHaveBeenCalled();
  });
  it("should searchProducts", () => {
    component.searchProducts();
    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalledWith(false);
    expect(generalServiceSpy.updateSearchType).toHaveBeenCalled();
  });
  it("should searchBusinesses", () => {
    component.searchBusinesses();
    expect(generalServiceSpy.setShowBusinesses).toHaveBeenCalledWith(true);
    expect(generalServiceSpy.updateSearchType).toHaveBeenCalled();
  });
  it("should updateMobileMapView", () => {
    let mobileMapViewSpy = spyOn(component.setMobileMapView, "next");
    component.updateMobileMapView();
    expect(mobileMapViewSpy).toHaveBeenCalledWith("setMobileMapView");
  });
  it("should setMapDetailViewLocation", () => {
    let mobileMapViewSpy = spyOn(component.setMapDetailViewLocationParent, "emit");
    component.setMapDetailViewLocation(1);
    expect(mobileMapViewSpy).toHaveBeenCalledWith(1);
  });
  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");
    unsubscriber.and.callThrough();
    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });
});
