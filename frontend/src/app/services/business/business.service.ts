import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { environment } from "./../../../environments/environment";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  constructor(private httpService: HttpService) {}

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
      filteredParam["amenities"] = params.amenities.join();
    }
    if (params.query !== "") {
      filteredParam["query"] = params.query;
    }
    if (params.business_type !== null) {
      filteredParam["business_type"] = params.business_type;
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
    console.log("chikna");
    console.log(businesses);
    const markers = [];
    for (const item of businesses) {
      markers.push({ latlon: item.business.latlon, id: item.business.id });
    }
    return markers;
  }
}
