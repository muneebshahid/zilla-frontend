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
  getBusinessDetail(slugID: any): Observable<IBusiness> {
    return this.httpService.get(`${environment.businessUrl}/${slugID.slug}/${slugID.id}/`, {});
  }

  getExploreBusiness(): Observable<IBusiness[]> {
    return this.httpService.get(`${environment.exploreUrl}/`, {});
  }
}
