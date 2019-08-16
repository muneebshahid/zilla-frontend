import { GeneralService } from "./../../services/general/general.service";
import { businessObj, dummyAmenities, dummyBusinessTypes } from "src/app/testing/models";
import { BusinessService } from "./../../services/business/business.service";
import { ComponentFixture, TestBed } from "@angular/core/testing";
import { cold, getTestScheduler } from "jasmine-marbles";
import { BusinessInfoComponent } from "./business-info.component";
import { StoreModule, Store } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { of } from "rxjs";
import { defaultLatlonDis } from "src/app/store/state/general";
import { FiltersService } from "src/app/services/filters/filters.service";
import { IAppState } from "src/app/store/state/app.state";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { By } from "@angular/platform-browser";

describe("BusinessInfoComponent", () => {
  let component: BusinessInfoComponent;
  let fixture: ComponentFixture<BusinessInfoComponent>;
  let businessServiceSpy;
  let generalServiceSpy;
  let filterServiceSpy;
  let gparams;
  let bparams;
  let store: Store<IAppState>;

  beforeEach(async () => {
    businessServiceSpy = jasmine.createSpyObj("BusinessService", [
      "dispatchSearchBusinesses",
      "getPendingDetailID",
      "getBusinesses",
      "getBusinessFilterTypes",
      "setBusinessFilterTypes",
      "dispatchGetBusinessDetail",
      "updateBusinessFilters",
      "setBusinessFilter"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["selectTypeInFilter"]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFiltersCity",
      "setGeneralFiltersLatLon",
      "setGeneralFilters",
      "setShowBusinesses",
      "getShowBusinesses",
      "getGeneralFilters"
    ]);

    filterServiceSpy.selectTypeInFilter.and.returnValue(null);
    businessServiceSpy.dispatchGetBusinessDetail.and.returnValue(null);
    businessServiceSpy.getPendingDetailID.and.returnValue(null);
    businessServiceSpy.getBusinessFilterTypes.and.returnValue(null);
    businessServiceSpy.getBusinesses.and.returnValue(businessObj);

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

    TestBed.configureTestingModule({
      declarations: [BusinessInfoComponent],
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule],
      providers: [
        { provide: BusinessService, useValue: businessServiceSpy },
        { provide: GeneralService, useValue: generalServiceSpy },
        { provide: FiltersService, useValue: filterServiceSpy }
      ]
    }).compileComponents();

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusinessInfoComponent);
    component = fixture.componentInstance;
    component.ngOnInit();
    fixture.detectChanges();
  });

  it("should create", () => {
    expect(component).toBeTruthy();
  });
  it("should call subscribe in ngOnInit for getting businesses", () => {
    spyOn(component.businessesSelector, "subscribe").and.returnValue(of(businessObj));
    spyOn(component.generalFiltersSelector, "subscribe").and.returnValue(of(gparams));
    spyOn(component.businessFilterSelector, "subscribe").and.returnValue(of(bparams));
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.businessesSelector.subscribe).toHaveBeenCalled();
    expect(component.generalFiltersSelector.subscribe).toHaveBeenCalled();
    expect(component.businessFilterSelector.subscribe).toHaveBeenCalled();
  });
  it("should emit numberOfShownBusinesses, set firstCall, call getPendingDetailID", () => {
    const observableParam = cold("a|", { a: businessObj });
    const numBusinessSpyOn = spyOn(component.numberOfShownBusinesses, "emit");

    component.businessesSelector = observableParam;
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(component.firstCall).toBe(false);
    expect(numBusinessSpyOn).toHaveBeenCalled();
    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchGetBusinessDetail).not.toHaveBeenCalled();
    expect(component.subscriptionsArr.length).toBeGreaterThan(2);
  });
  it("should emit shownBusinesses, set firstCall, call getPendingDetailID, call dispatchGetBusinessDetail", () => {
    businessServiceSpy.getPendingDetailID.and.returnValue(1);

    const observableParam = cold("a|", { a: businessObj });
    const numBusinessSpyOn = spyOn(component.numberOfShownBusinesses, "emit");

    component.businessesSelector = observableParam;
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(component.firstCall).toBe(false);
    expect(numBusinessSpyOn).toHaveBeenCalled();
    expect(businessServiceSpy.getPendingDetailID).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalled();
  });
  it("should call setGeneralFilters inside GeneralFilterSelector", () => {
    const observableParam = cold("a|", { a: gparams });
    component.generalFiltersSelector = observableParam;
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(generalServiceSpy.setGeneralFilters).toHaveBeenCalled();
  });

  it("should set businessFilters using businessFilterSelector", () => {
    const observableParam = cold("a|", { a: bparams });
    component.businessFilterSelector = observableParam;
    component.ngOnInit();
    fixture.detectChanges();
    getTestScheduler().flush();

    expect(businessServiceSpy.setBusinessFilter).toHaveBeenCalled();
  });

  it("should call dispatchGetBusinessDetail using openDetailDrawer", () => {
    let businessInfoItem = fixture.debugElement.queryAll(By.css(".business-info-grid-item"));
    let businessInfoItemNative: HTMLElement = businessInfoItem[0].nativeElement;
    businessInfoItemNative.click();

    component.openDetailDrawer(1);
    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalledTimes(2);
  });

  it("should updateBusinessTypeSelection", () => {
    component.updateBusinessTypeSelection(1);
    expect(businessServiceSpy.getBusinessFilterTypes).toHaveBeenCalled();
    expect(businessServiceSpy.setBusinessFilterTypes).toHaveBeenCalled();
    expect(filterServiceSpy.selectTypeInFilter).toHaveBeenCalled();
  });

  it("should searchByTag", () => {
    spyOn(component, "updateBusinessTypeSelection");
    component.searchByTag(1);
    expect(businessServiceSpy.updateBusinessFilters).toHaveBeenCalled();
    expect(businessServiceSpy.dispatchSearchBusinesses).toHaveBeenCalled();
    expect(component.updateBusinessTypeSelection).toHaveBeenCalled();
  });

  it("should HighlightMarker also simulate using the mouseenter and mouseleave events", () => {
    let businessInfoItem = fixture.debugElement.queryAll(By.css(".business-info-grid-item"));
    let businessInfoItemNative: HTMLElement = businessInfoItem[0].nativeElement;

    const highlightMarkerAction = new HighlightMapMarker({
      highlightedMarkerID: 0,
      highlighted: true
    });
    const highlightMarkerAction2 = new HighlightMapMarker({
      highlightedMarkerID: 0,
      highlighted: false
    });

    const mouseenter = new MouseEvent("mouseenter");
    const mouseleave = new MouseEvent("mouseleave");
    businessInfoItemNative.dispatchEvent(mouseenter);
    businessInfoItemNative.dispatchEvent(mouseleave);

    component.highlightMarker(0, true);

    expect(businessInfoItem.length).toBe(2);
    expect(store.dispatch).toHaveBeenCalledWith(highlightMarkerAction);
    expect(store.dispatch).toHaveBeenCalledWith(highlightMarkerAction2);
    expect(store.dispatch).toHaveBeenCalledTimes(3);
  });

  it("should unsubscribe to subscriptions", () => {
    const sub1 = of().subscribe();
    component.subscriptionsArr.push(sub1);
    const unsubscriber = spyOn(component.subscriptionsArr[0], "unsubscribe");

    component.ngOnDestroy();

    expect(unsubscriber).toHaveBeenCalled();
  });
});
