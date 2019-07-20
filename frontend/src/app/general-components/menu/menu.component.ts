import { Component, OnInit, OnDestroy } from "@angular/core";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { selectGeneralFilters, selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { IGFilters } from "src/app/models/general_filters";
import { selectProductFilter } from "src/app/store/selectors/product";
import { selectBusinessFilter } from "src/app/store/selectors/business";
import { IBFilters } from "src/app/models/business_filters";
import { IPFilters } from "src/app/models/product_filters";
import { UpdateGeneralFilters } from "src/app/store/actions/general";
import { GetSearchBusiness } from "src/app/store/actions/business";
import { GetSearchProducts } from "src/app/store/actions/product";

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
  public generalFilters: IGFilters = null;
  public businessFilters: IBFilters = null;
  public productsFilters: IPFilters = null;
  public showingBusinesses = true;

  private subscriptionsArr: Subscription[] = [];
  private searchText: string;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filter => {
      this.generalFilters = filter;
    });
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessFilters = filter;
    });
    const productsFilterSubscriber = this.productsFilterSelector.subscribe(filter => {
      this.productsFilters = filter;
    });

    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
      }
    );

    this.subscriptionsArr.push(generalFiltersSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(productsFilterSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
  }

  searchResults() {
    this.generalFilters.query = this.searchText;

    this.store.dispatch(new UpdateGeneralFilters(Object.assign({}, this.generalFilters)));
    if (this.showingBusinesses) {
      this.store.dispatch(
        new GetSearchBusiness({
          businessParams: this.businessFilters,
          generalParams: this.generalFilters
        })
      );
    } else {
      this.store.dispatch(
        new GetSearchProducts({
          productParams: this.productsFilters,
          generalParams: this.generalFilters
        })
      );
    }
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
