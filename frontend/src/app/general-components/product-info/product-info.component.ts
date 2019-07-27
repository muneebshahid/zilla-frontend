import { Component, OnInit, Input, QueryList, ViewChildren, OnDestroy } from "@angular/core";
import { environment } from "src/environments/environment";
import { selectProducts, selectProductFilter } from "src/app/store/selectors/product";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { FiltersService } from "src/app/services/filters/filters.service";
import { selectGeneralFilters } from "src/app/store/selectors/general";
import { BusinessService } from "src/app/services/business/business.service";
import { ProductService } from "src/app/services/product/product.service";
import { GeneralService } from "src/app/services/general/general.service";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"]
})
export class ProductInfoComponent implements OnInit, OnDestroy {
  private subscriptionsArr: Subscription[] = [];
  @Input() public homePage = false;
  @ViewChildren("businessesParentTag") businessesParentTag: QueryList<any>;

  public productsFilterSelector = this.store
    .pipe(select(selectProductFilter))
    .subscribe(filter => this.productService.setProductFilters(filter));

  public productsSelector = this.store
    .pipe(select(selectProducts))
    .subscribe(products => this.businessService.setBusinesses(products));

  public generalFiltersSelector = this.store
    .pipe(select(selectGeneralFilters))
    .subscribe(filters => this.generalService.setGeneralFilters(filters));

  public endpoint = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private filterService: FiltersService,
    private productService: ProductService,
    private businessService: BusinessService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.subscriptionsArr.push(this.productsSelector);
    this.subscriptionsArr.push(this.productsFilterSelector);
    this.subscriptionsArr.push(this.generalFiltersSelector);
  }
  openDetailDrawer(id: number) {
    this.businessService.dispatchGetBusinessDetail(id);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }

  updateProductTypeSelection(id: number) {
    this.productService.setProductFilterTypes(
      this.filterService.selectTypeInFilter(this.productService.getProductFilterTypes(), id)
    );
  }

  searchByProductType(productTypeID: number) {
    this.updateProductTypeSelection(productTypeID);
    this.sendRequest();
  }
  searchByTag(tagId: number) {
    this.productService.setProductFilterTags(
      this.filterService.selectTagInFilter(this.productService.getProductFilterTags(), tagId)
    );
    this.sendRequest();
  }

  sendRequest() {
    this.productService.updateProductFilters();
    this.productService.dispatchSearchProducts(this.generalService.getGeneralFilters());
  }

  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
