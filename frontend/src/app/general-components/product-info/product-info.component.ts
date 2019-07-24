import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input } from "@angular/core";
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
export class ProductInfoComponent implements OnInit {
  private subscriptionsArr: Subscription[] = [];
  @Input() public homePage = false;

  public productsFilterSelector = this.store.pipe(select(selectProductFilter));
  public productsSelector = this.store.pipe(select(selectProducts));
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));
  public endpoint = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private filterService: FiltersService,
    private productService: ProductService,
    private businessService: BusinessService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    const productsSelectorSubscriber = this.productsSelector.subscribe(products => {
      this.businessService.setBusinesses(products);
    });
    const productFilterSubscriber = this.productsFilterSelector.subscribe(filters => {
      this.productService.setProductFilters(filters);
    });
    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filters => {
      this.generalService.setGeneralFilters(filters);
    });

    this.subscriptionsArr.push(productFilterSubscriber);
    this.subscriptionsArr.push(productsSelectorSubscriber);
    this.subscriptionsArr.push(generalFiltersSubscriber);
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
