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
import { Store, select } from "@ngrx/store";
import { IGFilters } from "src/app/models/general_filters";
import { GeneralService } from "../general/general.service";
import { selectDefaultProductFilters } from "src/app/store/selectors/product";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class ProductService {
  public productFilter: IPFilters;
  public defaultProductFilter: IPFilters;
  private defaultProductFilterSelector = this.store.pipe(select(selectDefaultProductFilters));
  public productHits: number;

  constructor(
    private httpService: HttpService,
    private filterService: FiltersService,
    private store: Store<IAppState>,
    private generalService: GeneralService
  ) {
    this.defaultProductFilterSelector.pipe(take(1)).subscribe(data => {
      this.defaultProductFilter = data;
    });
  }

  cleanProductFilters(pparams: any, gparams: any) {
    let filteredParam = {};
    let product_type = this.filterService.getSelectedTypeID(pparams.product_types);
    let tags = this.filterService.getSelectedTagsCSVs(pparams.tags);

    if (gparams.query !== "") {
      filteredParam["query"] = gparams.query;
    }
    filteredParam["latlondis"] = `${gparams.latlondis[0]},${gparams.latlondis[1]},${
      gparams.latlondis[2]
    }`;
    if (pparams.price !== this.defaultProductFilter.price) {
      filteredParam["price"] = pparams.price;
    }
    // if (pparams.available !== -1) {
    //   filteredParam["available"] = pparams.available;
    // }

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

    if (this.productFilter.price !== this.defaultProductFilter.price) {
      selectedFilters.push({
        key: objectKeys[3],
        value: "Price: " + this.productFilter.price + "€",
        id: null
      });
    }
    return selectedFilters;
  }

  updateProductFilters() {
    this.store.dispatch(new UpdateProductFilters(Object.assign({}, this.productFilter)));
  }
  dispatchSearchProducts(generalParams: IGFilters) {
    this.generalService.updateLoadingSign(true);
    this.store.dispatch(
      new GetSearchProducts({ productParams: this.productFilter, generalParams: generalParams })
    );
  }

  filterChanged() {
    if (
      this.defaultProductFilter.price === this.productFilter.price &&
      !this.filterService.typeFilterSelected(this.productFilter.product_types) &&
      !this.filterService.tagFilterSelected(this.productFilter.tags)
    ) {
      return false;
    }
    return true;
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
  setProductHits(hits) {
    this.productHits = hits;
  }
  getProductHits() {
    return this.productHits;
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
  getDefaultProductFilters() {
    return this.defaultProductFilter;
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
