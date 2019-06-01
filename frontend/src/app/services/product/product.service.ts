import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { IProduct } from "src/app/models/product";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpService: HttpService) {}

  getProductDetails(id: number) {}

  getNearbyProducts(latlng: any): Observable<IProduct> {
    return this.httpService.get("explore");
  }

  /* BusinessObj will contain the slug and business id to send */
  getProductsOfBusiness(businessObj: any) {}

  updateProductDetails(object: any) {}

  addProduct(object: any) {}

  removeProduct(id: number) {}
}
