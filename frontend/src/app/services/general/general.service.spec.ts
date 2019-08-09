import { TestBed, tick, fakeAsync } from "@angular/core/testing";

import { GeneralService } from "./general.service";
import { StoreModule, Store } from "@ngrx/store";
import { appReducers } from "src/app/store/reducers/app.reducer";
import { HttpClientTestingModule } from "@angular/common/http/testing";
import { RouterTestingModule } from "@angular/router/testing";
import { defaultLatlonDis, defaultCity } from "src/app/store/state/general";
import { IAppState } from "src/app/store/state/app.state";
import {
  UpdateGeneralFilters,
  UpdateDefaultLatLonDis,
  UpdateSearchType,
  UpdateIsLoading
} from "src/app/store/actions/general";
import { IFilterChips } from "src/app/models/filterchips";
import { filter } from "rxjs/operators";

describe("GeneralService", () => {
  let gParams;
  let store: Store<IAppState>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [StoreModule.forRoot(appReducers), HttpClientTestingModule, RouterTestingModule]
    });

    gParams = {
      latlondis: defaultLatlonDis,
      query: "",
      city: defaultCity
    };

    store = TestBed.get(Store);
    spyOn(store, "dispatch").and.callThrough();
  });

  it("should be created", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service).toBeTruthy();
  });
  it("should set default latlondis value", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    let lld = service.getDefaultLatLonDis();
    expect(lld[0]).toBe(defaultLatlonDis[0]);
    expect(lld[1]).toBe(defaultLatlonDis[1]);
    expect(lld[2]).toBe(defaultLatlonDis[2]);
  });
  it("should set default city value", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    expect(service.getDefaultCity()).toBe(defaultCity);
  });
  it("should set defaultLatLonDis", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    let dlld = [0, 1, 2];
    service.setDefaultLatLonDis(dlld);
    expect(service.getDefaultLatLonDis()[0]).toBe(dlld[0]);
    expect(service.getDefaultLatLonDis()[1]).toBe(dlld[1]);
    expect(service.getDefaultLatLonDis()[2]).toBe(dlld[2]);
  });
  it("should set defaultCity", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setDefaultCity(defaultCity);
    expect(service.getDefaultCity()).toBe(defaultCity);
  });
  it("should set ShowBusinesses", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setShowBusinesses(true);
    expect(service.getShowBusinesses()).toBe(true);
    service.setShowBusinesses(false);
    expect(service.getShowBusinesses()).toBe(false);
  });
  it("should set GeneralFilters", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    let generalFilters = service.getGeneralFilters();
    expect(generalFilters.query).toBe("");
    expect(generalFilters.city).toBe(defaultCity);
    expect(generalFilters.latlondis).toBe(defaultLatlonDis);
  });
  it("should set GeneralFilters LatLon", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    service.setGeneralFiltersLatLon(1, 2);
    expect(service.getGeneralFilters().latlondis[0]).toBe(1);
    expect(service.getGeneralFilters().latlondis[1]).toBe(2);
  });
  it("should set GeneralFiltersRadius", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    service.setGeneralFiltersRadius(4);
    expect(service.getGeneralFilters().latlondis[2]).toBe(4);
  });
  it("should set GeneralFiltersRadius", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    service.setGeneralFiltersCity(defaultCity);
    expect(service.getGeneralFilters().city).toBe(defaultCity);
  });
  it("should set setGeneralFilterQuery", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    service.setGeneralFilterQuery("abc");
    expect(service.getGeneralFilters().query).toBe("abc");
  });
  it("should dispatch action updateGeneralFilters", () => {
    const updateGeneralFiltersAction = new UpdateGeneralFilters(Object.assign({}, gParams));
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);
    service.updateGeneralFilters();
    expect(store.dispatch).toHaveBeenCalledWith(updateGeneralFiltersAction);
  });
  it("should dispatch action updateDefaultLatLonDis", () => {
    const updateGeneralFiltersAction = new UpdateDefaultLatLonDis(Object.assign({}, gParams));
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);
    service.updateDefaultLatLonDis();
    expect(store.dispatch).toHaveBeenCalledWith(updateGeneralFiltersAction);
  });
  it("should dispatch action updateSearchType", () => {
    const showB = true;
    const updateGeneralFiltersAction = new UpdateSearchType({ showingBusinesses: showB });
    const service: GeneralService = TestBed.get(GeneralService);
    service.setShowBusinesses(showB);
    service.updateSearchType();
    expect(store.dispatch).toHaveBeenCalledWith(updateGeneralFiltersAction);
  });
  it("should dispatch action updateLoadingSign", fakeAsync(() => {
    const addSign = true;
    const loadingSignAction = new UpdateIsLoading(addSign);
    const service: GeneralService = TestBed.get(GeneralService);
    service.updateLoadingSign(addSign);
    tick(100);
    expect(store.dispatch).toHaveBeenCalledWith(loadingSignAction);
  }));

  it("should removeGeneralFilter", () => {
    let filterChips: IFilterChips[] = [
      { id: 1, key: "query", value: "burger" },
      { id: 2, key: "radius", value: "200" }
    ];

    gParams.query = "burger";
    gParams.latlondis = [1, 2, 3];

    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    let serviceGParams = service.getGeneralFilters();
    expect(serviceGParams.query).toBe("burger");
    expect(serviceGParams.latlondis[0]).toBe(1);
    expect(serviceGParams.latlondis[1]).toBe(2);
    expect(serviceGParams.latlondis[2]).toBe(3);

    service.removeGeneralFilter(filterChips, "query");
    serviceGParams = service.getGeneralFilters();
    expect(serviceGParams.query).toBe("");

    service.removeGeneralFilter(filterChips, "radius");
    serviceGParams = service.getGeneralFilters();
    expect(serviceGParams.latlondis[0]).toBe(defaultLatlonDis[0]);
    expect(serviceGParams.latlondis[1]).toBe(defaultLatlonDis[1]);
    expect(serviceGParams.latlondis[2]).toBe(defaultLatlonDis[2]);
  });

  it("should getFilterChips", () => {
    gParams.query = "burger";
    gParams.latlondis = [1, 2, 3];

    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);

    let chips = service.getFilterChips(gParams);
    expect(chips[0].id).toBeNull();
    expect(chips[0].key).toBe("query");
    expect(chips[0].value).toBe("burger");

    expect(chips[1].id).toBeNull();
    expect(chips[1].key).toBe("radius");
    expect(chips[1].value).toBe(`Search Radius: ${gParams.latlondis[2]} Km, ${gParams.city}`);
  });
  it("should check if filter is changed from default", () => {
    const service: GeneralService = TestBed.get(GeneralService);
    service.setGeneralFilters(gParams);
    let isFilterChanged = service.filterChanged();
    expect(isFilterChanged).toBe(false);

    gParams.query = "burger";
    gParams.latlondis = [1, 2, 3];
    service.setGeneralFilters(gParams);

    isFilterChanged = service.filterChanged();
    expect(isFilterChanged).toBe(true);
  });
});
