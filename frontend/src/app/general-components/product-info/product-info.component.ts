import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { selectProducts, selectProductFilter } from "src/app/store/selectors/product";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { IPFilters } from "src/app/models/product_filters";
import { GetSearchProducts, UpdateProductFilters } from "src/app/store/actions/product";
import { FiltersService } from "src/app/services/filters/filters.service";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"]
})
export class ProductInfoComponent implements OnInit {
  private subscriptionsArr: Subscription[] = [];
  public businessProducts: IBusiness[];
  @Input() public homePage = false;

  public productsFilterSelector = this.store.pipe(select(selectProductFilter));
  public productsSelector = this.store.pipe(select(selectProducts));
  public endpoint = environment.apiEndpoint;
  public filters: IPFilters = null;

  constructor(private store: Store<IAppState>, private filterService: FiltersService) {}

  ngOnInit() {
    const businessProductsSubscriber = this.productsSelector.subscribe(businessProducts => {
      this.businessProducts = businessProducts;
    });
    const productFilterSubscriber = this.productsFilterSelector.subscribe(filters => {
      this.filters = filters;
    });

    this.subscriptionsArr.push(businessProductsSubscriber);
    this.subscriptionsArr.push(productFilterSubscriber);
  }
  openDetailDrawer(id: number) {
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }

  updateProductTypeSelection(id: number) {
    this.filters.product_types = this.filterService.selectTypeInFilter(
      this.filters.product_types,
      id
    );
  }

  searchByProductType(productTypeID: number) {
    this.updateProductTypeSelection(productTypeID);
    this.sendRequest();
  }
  searchByTag(tagId: number) {
    this.filters.tags = this.filterService.selectTagInFilter(this.filters.tags, tagId);
    this.sendRequest();
  }

  sendRequest() {
    this.store.dispatch(new UpdateProductFilters(Object.assign({}, this.filters)));
    this.store.dispatch(new GetSearchProducts(this.filters));
  }

  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
