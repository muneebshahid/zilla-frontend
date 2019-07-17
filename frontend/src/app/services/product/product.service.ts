import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { IProduct } from "src/app/models/product";
import { FiltersService } from "../filters/filters.service";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(private httpService: HttpService, private filterService: FiltersService) {}

  getProductDetails(productObj: any): Observable<IProduct> {
    return this.httpService.get(
      `${environment.productUrl}/${productObj.slug}/${productObj.id}/`,
      {}
    );
  }

  getSearchProducts(params: any) {
    const filteredParams = this.cleanProductFilters(params);
    return this.httpService.get(
      `${environment.searchUrl}/${environment.productUrl}/`,
      filteredParams
    );
  }

  getProductTypes() {
    return this.httpService.get(`${environment.productTypeUrl}/`, {});
  }
  getProductTags() {
    return this.httpService.get(`${environment.productTagsUrl}/`, {});
  }

  cleanProductFilters(params) {
    let filteredParam = {};
    if (params.query !== "") {
      filteredParam["query"] = params.query;
    }
    if (params.product_types.length !== 0) {
      let productID = this.filterService.getSelectedTypeID(params.product_types);
      if (productID !== undefined) {
        filteredParam["product_type"] = productID;
      }
    }
    if (params.tags.length !== 0) {
      filteredParam["tags"] = this.filterService.getSelectedTagsCSVs(params.tags);
    }
    if (params.latlondis[0] !== -1) {
      filteredParam["latlondis"] = `${params.latlondis[0]},${params.latlondis[1]},${
        params.latlondis[2]
      }`;
    }
    if (params.price !== -1) {
      filteredParam["price"] = params.price;
    }
    if (params.available !== -1) {
      filteredParam["available"] = params.available;
    }
    return filteredParam;
  }

  /* businessObj business id to post */
  getProductsOfBusiness(businessId: any): Observable<IProduct[]> {
    return this.httpService.get(`${environment.exploreUrl}/${businessId}/`, {});
  }
}
