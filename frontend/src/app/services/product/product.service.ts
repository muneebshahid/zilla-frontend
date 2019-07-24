import { environment } from "./../../../environments/environment";
import { Injectable } from "@angular/core";
import { HttpService } from "../http/http.service";
import { Observable } from "rxjs";
import { IProduct } from "src/app/models/product";
import { FiltersService } from "../filters/filters.service";
import { IPFilters } from "src/app/models/product_filters";
import { IFilterChips } from "src/app/models/filterchips";
import {
  UpdateProductFilters,
  GetProductTypes,
  GetProductTags,
  GetSearchProducts
} from "src/app/store/actions/product";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import { IGFilters } from "src/app/models/general_filters";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  constructor(
    private httpService: HttpService,
    private filterService: FiltersService,
    private store: Store<IAppState>
  ) {}

  private productFilter: IPFilters;

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

  getFilterChips(productFilter: IPFilters) {
    let selectedFilters: IFilterChips[] = [];
    let objectKeys = Object.keys(productFilter);

    let selectedTypeIDObject = this.filterService.getSelectedTypeIDObject(
      productFilter.product_types
    );

    let selectedTags = this.filterService.getSelectedTagsObjs(productFilter.tags);

    if (selectedTypeIDObject !== null) {
      selectedFilters.push({
        key: objectKeys[0],
        value: selectedTypeIDObject.name,
        id: selectedTypeIDObject.id
      });
    }

    if (selectedTags.length != 0) {
      for (let item of selectedTags) {
        selectedFilters.push({
          key: objectKeys[1],
          value: item.tag,
          id: item.id
        });
      }
    }
    return selectedFilters;
  }

  updateProductFilters(params: any) {
    this.store.dispatch(new UpdateProductFilters(Object.assign({}, params)));
  }
  dispatchSearchProducts(generalParams: IGFilters) {
    this.store.dispatch(
      new GetSearchProducts({ businessParams: this.productFilter, generalParams: generalParams })
    );
  }

  getProductFilterData() {
    this.store.dispatch(new GetProductTypes());
    this.store.dispatch(new GetProductTags());
  }

  setProductFilters(filters) {
    this.productFilter = filters;
  }
  setProductFilterTypes(types) {
    this.productFilter.product_types = types;
  }
  setProductFilterTags(tags) {
    this.productFilter.tags = tags;
  }
  setProductFilterPrice(price) {
    this.productFilter.price = price;
  }
  getProductFilterTypes() {
    return this.productFilter.product_types;
  }
  getProductFilterTags() {
    return this.productFilter.tags;
  }
  getProductFilterPrice() {
    return this.productFilter.price;
  }
  getProductFilters() {
    return this.productFilter;
  }

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
}
