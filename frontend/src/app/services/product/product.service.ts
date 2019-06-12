import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { IProductState } from "src/app/store/state/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getProductDetails(id: number) {}

  getNearbyProducts(latlng: any): Observable<IProductState> {
    return this.httpService.get("explore");
  }

  /* businessObj business id to post */
  getProductsOfBusiness(businessId: any) {
    return this.httpService.get(`${environment.exploreUrl}/${businessId}`);
  }

  updateProductDetails(object: any) {}

  addProduct(object: any) {}

  removeProduct(id: number) {}
}
