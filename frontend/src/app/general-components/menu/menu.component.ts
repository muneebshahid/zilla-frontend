import { Component, OnInit, OnDestroy } from "@angular/core";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { selectGeneralFilters, selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { selectProductFilter } from "src/app/store/selectors/product";
import { selectBusinessFilter } from "src/app/store/selectors/business";
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";
import { ProductService } from "src/app/services/product/product.service";

@Component({
  selector: "app-menu",
  templateUrl: "./menu.component.html",
  styleUrls: ["./menu.component.css"]
})
export class MenuComponent implements OnInit, OnDestroy {
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public productsFilterSelector = this.store.pipe(select(selectProductFilter));
  public businessesFilterSelector = this.store.pipe(select(selectBusinessFilter));

  public subscriptionsArr: Subscription[] = [];
  public searchText: string;

  constructor(
    private store: Store<IAppState>,
    private businessService: BusinessService,
    private generalService: GeneralService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filter => {
      this.generalService.setGeneralFilters(filter);
    });
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessService.setBusinessFilter(filter);
    });
    const productsFilterSubscriber = this.productsFilterSelector.subscribe(filter => {
      this.productService.setProductFilters(filter);
    });

    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.generalService.setShowBusinesses(showingBusinesses);
      }
    );

    this.subscriptionsArr.push(generalFiltersSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(productsFilterSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
  }

  searchResults() {
    if (this.searchText === "" || this.searchText === this.generalService.getGeneralFilterQuery()) {
      return;
    }

    this.generalService.setGeneralFilterQuery(this.searchText);
    this.generalService.updateGeneralFilters();

    if (this.generalService.getShowBusinesses()) {
      this.businessService.dispatchSearchBusinesses(this.generalService.getGeneralFilters());
    } else {
      this.productService.dispatchSearchProducts(this.generalService.getGeneralFilters());
    }
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
