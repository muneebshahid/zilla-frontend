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

  getNearbyBusinesses(latlng: any): Observable<IBusiness> {
    return this.httpService.get("explore", {});
  }
  getSearchBusinesses(params: any) {
    return this.httpService.get(`${environment.searchUrl}/${environment.businessUrl}/`, params);
  }

  getBusinessFromProduct() {}
  cleanBusinessFilters(params) {}
  getBusinessDetail(businessID: any): Observable<IBusiness> {
    return this.httpService.get(`${environment.businessUrl}/${businessID.id}/`, {});
  }

  getBusinesstypes() {
    return this.httpService.get(`${environment.businessTypeUrl}/`, {});
  }
  getBusinessAmenities() {
    return this.httpService.get(`${environment.businessAmenitiesUrl}/`, {});
  }
  getExploreBusiness(): Observable<IBusiness[]> {
    return this.httpService.get(`${environment.exploreUrl}/`, {});
  }
}
