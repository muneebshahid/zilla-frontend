import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "./../../../environments/environment";
import { FiltersService } from "../filters/filters.service";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  constructor(private httpService: HttpService, private filterService: FiltersService) {}

  getSearchBusinesses(params: any) {
    const filteredParams = this.cleanBusinessFilters(params);
    return this.httpService.get(
      `${environment.searchUrl}/${environment.businessUrl}/`,
      filteredParams
    );
  }

  cleanBusinessFilters(params) {
    let filteredParam = {};
    if (params.latlondis[0] !== -1) {
      filteredParam["latlondis"] = `${params.latlondis[0]},${params.latlondis[1]},${
        params.latlondis[2]
      }`;
    }
    if (params.amenities.length !== 0) {
      let amenities = this.filterService.getSelectedTagsCSVs(params.amenities);
      if (amenities !== "") {
        filteredParam["amenities"] = amenities;
      }
    }
    if (params.query !== "") {
      filteredParam["query"] = params.query;
    }
    if (params.business_types.length !== 0) {
      let businessTypeID = this.filterService.getSelectedTypeID(params.business_types);
      if (businessTypeID !== undefined) {
        filteredParam["business_type"] = businessTypeID;
      }
    }
    return filteredParam;
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
}
