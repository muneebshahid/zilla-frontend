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
    let product_type = this.filterService.getSelectedTypeID(params.product_types);
    let tags = this.filterService.getSelectedTagsCSVs(params.tags);

    if (params.query !== "") {
      filteredParam["query"] = params.query;
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

    if (product_type !== null) {
      filteredParam["product_type"] = product_type;
    }

    if (tags !== "") {
      filteredParam["tags"] = tags;
    }

    return filteredParam;
  }

  /* businessObj business id to post */
  getProductsOfBusiness(businessId: any): Observable<IProduct[]> {
    return this.httpService.get(`${environment.exploreUrl}/${businessId}/`, {});
  }
}
