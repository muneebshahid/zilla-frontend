import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "./../../../environments/environment";
import { FiltersService } from "../filters/filters.service";
import { IBFilters } from "src/app/models/business_filters";
import { IFilterChips } from "src/app/models/filterchips";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import {
  UpdateBusinessFilters,
  GetBusinessAmenities,
  GetBusinessTypes
} from "src/app/store/actions/business";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  public businessFilters: IBFilters;

  constructor(
    private httpService: HttpService,
    private filterService: FiltersService,
    private store: Store<IAppState>
  ) {}

  getSearchBusinesses(params: any) {
    const filteredParams = this.cleanBusinessFilters(params.businessParams, params.generalParams);
    return this.httpService.get(
      `${environment.searchUrl}/${environment.businessUrl}/`,
      filteredParams
    );
  }

  cleanBusinessFilters(bparams: any, gparams: any) {
    let filteredParam = {};
    let amenities = this.filterService.getSelectedTagsCSVs(bparams.amenities);
    let businessTypeID = this.filterService.getSelectedTypeID(bparams.business_types);

    if (gparams.latlondis[0] !== -1) {
      filteredParam["latlondis"] = `${gparams.latlondis[0]},${gparams.latlondis[1]},${
        gparams.latlondis[2]
      }`;
    }
    if (amenities !== "") {
      filteredParam["amenities"] = amenities;
    }
    if (gparams.query !== "") {
      filteredParam["query"] = gparams.query;
    }

    if (businessTypeID !== null) {
      filteredParam["business_type"] = businessTypeID;
    }
    return filteredParam;
  }

  /* This is called to extract the markers from the search results sent by server, to show on the map */
  getMarkersFromPayload(businesses: IBusiness[]) {
    const markers = [];

    /* helps us not add the same marker twice, since calling products can send us multiple business with same id. */
    const pushedIds = [];
    for (const item of businesses) {
      if (!pushedIds.includes(item.business.id)) {
        markers.push({ latlon: item.business.latlon, id: item.business.id });
      }
      pushedIds.push(item.business.id);
    }
    return markers;
  }

  getFilterChips(businessFilter: IBFilters) {
    let selectedFilters: IFilterChips[] = [];
    let objectKeys = Object.keys(businessFilter);
    let selectedTypeIDObject = this.filterService.getSelectedTypeIDObject(
      businessFilter.business_types
    );

    let selectedTags = this.filterService.getSelectedTagsObjs(businessFilter.amenities);
    if (selectedTypeIDObject !== null) {
      selectedFilters.push({
        key: objectKeys[1],
        value: selectedTypeIDObject.name,
        id: selectedTypeIDObject.id
      });
    }

    if (selectedTags.length != 0) {
      for (let item of selectedTags) {
        selectedFilters.push({
          key: objectKeys[0],
          value: item.tag,
          id: item.id
        });
      }
    }
    return selectedFilters;
  }

  saveBusinessFiltersState(selectedTags, selectedTypes) {
    this.businessFilters.amenities = selectedTags;
    this.businessFilters.business_types = selectedTypes;
  }

  setOriginalBusinessFilter(originalBusinessFilter: IBFilters) {
    this.businessFilters = originalBusinessFilter;
  }
  getOriginalBusinessFilter() {
    return this.businessFilters;
  }

  getBusinessFilterData() {
    this.store.dispatch(new GetBusinessAmenities());
    this.store.dispatch(new GetBusinessTypes());
  }

  updateBusinessFilters(params: any) {
    this.store.dispatch(new UpdateBusinessFilters(Object.assign({}, params)));
  }

  getBusinessDetail(businessID: any): Observable<IBusiness> {
    return this.httpService.get(`${environment.businessUrl}/${businessID.id}/`, {});
  }

  getBusinesstypes() {
    return this.httpService.get(`${environment.businessTypeUrl}/`, {});
  }
  getBusinessAmenities() {
    return this.httpService.get(`${environment.businessAmenitiesUrl}/`, {});
  }
}
