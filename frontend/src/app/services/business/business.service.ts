import { LocationService } from "./../location/location.service";
import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "./../../../environments/environment";
import { FiltersService } from "../filters/filters.service";
import { IBFilters } from "src/app/models/business_filters";
import { IFilterChips } from "src/app/models/filterchips";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import {
  UpdateBusinessFilters,
  GetBusinessAmenities,
  GetBusinessTypes,
  GetSearchBusiness,
  GetBusinessDetail
} from "src/app/store/actions/business";
import { IGFilters } from "src/app/models/general_filters";
@Injectable({
  providedIn: "root"
})
export class BusinessService {
  public businessFilters: IBFilters;
  public businesses: IBusiness[] = [];
  public businessHits: number;
  public businessMarkers: any = [];
  private pendingDetailID: number = null;

  constructor(
    private httpService: HttpService,
    private filterService: FiltersService,
    private store: Store<IAppState>,
    private location: LocationService
  ) {}

  cleanBusinessFilters(bparams: IBFilters, gparams: IGFilters) {
    let filteredParam = {};
    let amenities = this.filterService.getSelectedTagsCSVs(bparams.amenities);
    let businessTypeID = this.filterService.getSelectedTypeID(bparams.business_types);

    filteredParam["latlondis"] = `${gparams.latlondis[0]},${gparams.latlondis[1]},${
      gparams.latlondis[2]
    }`;
    if (amenities !== "") {
      filteredParam["amenities"] = amenities;
    }
    if (gparams.query !== "") {
      filteredParam["query"] = gparams.query;
    }

    if (businessTypeID !== null) {
      filteredParam["business_type"] = businessTypeID;
    }

    if (bparams.paginate) {
      const nextPagination = [
        bparams.paginationInfo[0] + bparams.paginationInfo[2],
        bparams.paginationInfo[1] + bparams.paginationInfo[2],
        bparams.paginationInfo[2]
      ];
      filteredParam["pagination"] = `${nextPagination[0]},${nextPagination[1]}`;
      this.businessFilters.paginationInfo = nextPagination;
    } else {
      this.businessFilters.paginationInfo = [
        0,
        bparams.paginationInfo[2],
        bparams.paginationInfo[2]
      ];
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

  /* GETTERS AND SETTERSfunction */

  setBusinessFilter(businessFilter: IBFilters) {
    this.businessFilters = businessFilter;
  }
  setBusinessFilterAmenities(amenities) {
    this.businessFilters.amenities = amenities;
  }
  setBusinessFilterTypes(types) {
    this.businessFilters.business_types = types;
  }
  setBusinesses(businesses: IBusiness[], businessMarkers: any) {
    if (this.businessFilters.paginate) {
      this.businesses = this.businesses.concat(businesses);
      this.businessMarkers = this.businessMarkers.concat(businessMarkers);
    } else {
      this.businesses = businesses;
      this.businessMarkers = businessMarkers;
    }
  }
  setPendingDetailID(id: number) {
    this.pendingDetailID = id;
  }
  setBusinessHits(hits) {
    this.businessHits = hits;
  }
  getPendingDetailID() {
    return this.pendingDetailID;
  }
  getBusinessHits() {
    return this.businessHits;
  }

  getBusinessesMarkers() {
    return this.businessMarkers;
  }
  getBusinesses() {
    return this.businesses;
  }
  getBusinessFilter() {
    return this.businessFilters;
  }
  getBusinessFilterAmenities() {
    return this.businessFilters.amenities;
  }
  getBusinessFilterTypes() {
    return this.businessFilters.business_types;
  }

  /* ACTIONS DISPATCHES */
  getBusinessFilterData() {
    this.store.dispatch(new GetBusinessAmenities());
    this.store.dispatch(new GetBusinessTypes());
  }

  dispatchSearchBusinesses(generalParams: IGFilters, paginationCall: boolean = false) {
    this.businessFilters.paginate = paginationCall;
    this.store.dispatch(
      new GetSearchBusiness({ businessParams: this.businessFilters, generalParams: generalParams })
    );
  }
  updateBusinessFilters() {
    this.store.dispatch(new UpdateBusinessFilters(Object.assign({}, this.businessFilters)));
  }
  dispatchGetBusinessDetail(id: number) {
    this.location.setDetailLocation(id, environment.businessUrl);
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }

  filterChanged() {
    if (
      !this.filterService.typeFilterSelected(this.businessFilters.business_types) &&
      !this.filterService.tagFilterSelected(this.businessFilters.amenities)
    ) {
      return false;
    }
    return true;
  }

  checkBusinessShownByID(id: number) {
    for (let i = 0; i < this.businesses.length; i++) {
      if (this.businesses[i].business.id === id) {
        return true;
      }
    }
    return false;
  }

  /* HTTP CALLS */
  getSearchBusinesses(params: any) {
    const filteredParams = this.cleanBusinessFilters(params.businessParams, params.generalParams);
    return this.httpService.get(
      `${environment.searchUrl}/${environment.businessUrl}/`,
      filteredParams
    );
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
