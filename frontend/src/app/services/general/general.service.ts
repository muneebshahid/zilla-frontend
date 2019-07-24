import { Injectable } from "@angular/core";
import { IGFilters } from "src/app/models/general_filters";
import { IFilterChips } from "src/app/models/filterchips";
import { UpdateGeneralFilters } from "src/app/store/actions/general";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  constructor(private store: Store<IAppState>) {}

  defaultLatLonDis: Array<number>;
  defaultCity: string;

  originalGeneralFilters: IGFilters;

  setDefaultLatLonDis(defaultLatLonDis: Array<number>) {
    this.defaultLatLonDis = Object.assign({}, defaultLatLonDis);
  }
  setDefaultCity(defaultCity: string) {
    this.defaultCity = defaultCity;
  }
  setOriginalFilter(originalFilter: IGFilters) {
    this.originalGeneralFilters = originalFilter;
  }

  getDefaultLatLonDis() {
    return this.defaultLatLonDis;
  }
  getDefaultCity() {
    return this.defaultCity;
  }
  getOriginalFilter() {
    return this.originalGeneralFilters;
  }
  updateGeneralFilters(params: any) {
    this.store.dispatch(new UpdateGeneralFilters(Object.assign({}, params)));
  }

  removeGeneralFilter(generalFilterChips: IFilterChips[], type: string) {
    for (let i = 0; i < generalFilterChips.length; i++) {
      if (type === "query") {
        this.originalGeneralFilters.query = "";
      } else if (type === "radius") {
        this.originalGeneralFilters.latlondis = Object.assign([], this.defaultLatLonDis);
        this.originalGeneralFilters.city = this.defaultCity;
      }
    }

    return this.originalGeneralFilters;
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
