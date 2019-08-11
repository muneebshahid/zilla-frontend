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
      "dispatchGetBusinessDetail",
      "getPendingDetailID",
      "setBusinessFilter",
      "setBusinessFilterTypes",
      "updateBusinessFilters",
      "getBusinessFilterTypes",
      "dispatchSearchBusinesses"
    ]);
    filterServiceSpy = jasmine.createSpyObj("FilterService", ["selectTypeInFilter"]);
    generalServiceSpy = jasmine.createSpyObj("GeneralService", [
      "setGeneralFilters",
      "getGeneralFilters"
    ]);

    filterServiceSpy.selectTypeInFilter.and.returnValue(null);
    businessServiceSpy.dispatchGetBusinessDetail.and.returnValue(null);
    businessServiceSpy.getPendingDetailID.and.returnValue(null);
    businessServiceSpy.getBusinessFilterTypes.and.returnValue(null);

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
    expect(component.subscriptionsArr.length).toBeGreaterThan(0);
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
    component.openDetailDrawer(1);
    expect(businessServiceSpy.dispatchGetBusinessDetail).toHaveBeenCalled();
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

  it("should HighlightMarker", () => {
    const highlightMarkerAction = new HighlightMapMarker({
      highlightedMarkerID: 1,
      highlighted: true
    });
    component.highlightMarker(1, true);
    expect(store.dispatch).toHaveBeenCalledWith(highlightMarkerAction);
  });
});
