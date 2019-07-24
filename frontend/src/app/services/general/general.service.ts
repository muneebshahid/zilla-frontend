import { Injectable } from "@angular/core";
import { IGFilters } from "src/app/models/general_filters";
import { IFilterChips } from "src/app/models/filterchips";
import {
  UpdateGeneralFilters,
  UpdateDefaultLatLonDis,
  UpdateSearchType
} from "src/app/store/actions/general";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  constructor(private store: Store<IAppState>) {}

  public showingBusinesses = true;
  defaultLatLonDis: Array<number>;
  defaultCity: string;

  public generalFilters: IGFilters;

  setDefaultLatLonDis(defaultLatLonDis: Array<number>) {
    this.defaultLatLonDis = Object.assign({}, defaultLatLonDis);
  }
  setDefaultCity(defaultCity: string) {
    this.defaultCity = defaultCity;
  }
  setShowBusinesses(showing) {
    this.showingBusinesses = showing;
  }
  setGeneralFilters(generalFilters: IGFilters) {
    this.generalFilters = generalFilters;
  }
  setGeneralFiltersLatLon(lat, lng) {
    this.generalFilters.latlondis[0] = lat;
    this.generalFilters.latlondis[1] = lng;
  }
  setGeneralFiltersRadius(radius) {
    this.generalFilters.latlondis[2] = radius;
  }
  setGeneralFiltersCity(city) {
    this.generalFilters.city = city;
  }
  setGeneralFilterQuery(query) {
    this.generalFilters.query = query;
  }

  getGeneralFilterQuery() {
    return this.generalFilters.query;
  }

  getShowBusinesses() {
    return this.showingBusinesses;
  }

  getDefaultLatLonDis() {
    return this.defaultLatLonDis;
  }
  getDefaultCity() {
    return this.defaultCity;
  }
  getGeneralFilters() {
    return this.generalFilters;
  }
  getGeneralFiltersLatLonDis() {
    return this.generalFilters.latlondis;
  }

  updateGeneralFilters() {
    this.store.dispatch(new UpdateGeneralFilters(Object.assign({}, this.generalFilters)));
  }
  updateDefaultLatLonDis() {
    this.store.dispatch(new UpdateDefaultLatLonDis(Object.assign({}, this.generalFilters)));
  }
  updateSearchType() {
    this.store.dispatch(new UpdateSearchType({ showingBusinesses: this.showingBusinesses }));
  }

  removeGeneralFilter(generalFilterChips: IFilterChips[], type: string) {
    for (let i = 0; i < generalFilterChips.length; i++) {
      if (type === "query") {
        this.generalFilters.query = "";
      } else if (type === "radius") {
        this.generalFilters.latlondis = Object.assign([], this.defaultLatLonDis);
        this.generalFilters.city = this.defaultCity;
      }
    }

    return this.generalFilters;
  }

  getFilterChips(generalFilter: IGFilters) {
    let selectedFilters: IFilterChips[] = [];
    if (generalFilter.query !== "") {
      selectedFilters.push({
        key: "query",
        id: null,
        value: generalFilter.query
      });
    }

    if (
      generalFilter.latlondis[2] != this.defaultLatLonDis[2] ||
      generalFilter.latlondis[0] != this.defaultLatLonDis[0] ||
      generalFilter.latlondis[1] != this.defaultLatLonDis[1]
    ) {
      selectedFilters.push({
        key: "radius",
        id: null,
        value: `Search Radius: ${generalFilter.latlondis[2]} Km, ${generalFilter.city}`
      });
    }

    return selectedFilters;
  }
}
