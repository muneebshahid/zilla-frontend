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
    const filteredParams = this.cleanProductFilters(params.productParams, params.generalParams);
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

  cleanProductFilters(pparams: any, gparams: any) {
    let filteredParam = {};
    let product_type = this.filterService.getSelectedTypeID(pparams.product_types);
    let tags = this.filterService.getSelectedTagsCSVs(pparams.tags);

    if (gparams.query !== "") {
      filteredParam["query"] = gparams.query;
    }
    if (gparams.latlondis[0] !== -1) {
      filteredParam["latlondis"] = `${gparams.latlondis[0]},${gparams.latlondis[1]},${
        gparams.latlondis[2]
      }`;
    }
    if (pparams.price !== -1) {
      filteredParam["price"] = pparams.price;
    }
    if (pparams.available !== -1) {
      filteredParam["available"] = pparams.available;
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
