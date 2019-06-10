import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  EXPLORE_URL = "e";

  constructor(private httpService: HttpService) {}

  getNearbyBusinesses(latlng: any): Observable<IBusiness> {
    return this.httpService.get("explore");
  }
  getBusinessFromProduct() {}
  getExploreBusiness(latlng: any): Observable<IBusiness> {
    return this.httpService.get(`${this.EXPLORE_URL}/${latlng.lat}/${latlng.lng}`);
  }
}
