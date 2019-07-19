import { Injectable } from "@angular/core";
import { IGFilters } from "src/app/models/general_filters";
import { IFilterChips } from "src/app/models/filterchips";

@Injectable({
  providedIn: "root"
})
export class GeneralService {
  constructor() {}

  getFilterChips(generalFilter: IGFilters) {
    let selectedFilters: IFilterChips[] = [];
    if (generalFilter.query !== "") {
      selectedFilters.push({
        key: "query",
        id: null,
        value: generalFilter.query
      });
    }

    if (generalFilter.latlondis[2] != 100000) {
      selectedFilters.push({
        key: "radius",
        id: null,
        value: generalFilter.latlondis[2]
      });
    }
    return selectedFilters;
  }
}
