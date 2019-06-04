import { IBusiness } from "./../../models/business";
import { Observable } from "rxjs";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";

@Injectable({
  providedIn: "root"
})
export class BusinessService {
  constructor(private httpService: HttpService) {}

  getNearbyBusinesses(latlng: any): Observable<IBusiness> {
    return this.httpService.get("explore");
  }
  getBusinessFromProduct() {}
  getExploreBusiness() {}
}
