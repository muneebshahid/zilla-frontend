import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import {
  GetBusinessDetail,
  UpdateBusinessFilters,
  GetSearchBusiness
} from "src/app/store/actions/business";
import { Subscription } from "rxjs";
import { selectBusinesses, selectBusinessFilter } from "src/app/store/selectors/business";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { IBFilters } from "src/app/models/business_filters";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit, OnDestroy {
  @Input() public homePage = false;
  private subscriptionsArr: Subscription[] = [];
  public businessesSelector = this.store.pipe(select(selectBusinesses));
  public businesses: IBusiness[];
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));

  public endpoint = environment.apiEndpoint;
  public filters: IBFilters = null;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const businessSubscriber = this.businessesSelector.subscribe(businesses => {
      this.businesses = businesses;
    });
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.filters = filters;
    });

    this.subscriptionsArr.push(businessSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
  openDetailDrawer(id: number) {
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }
  searchByTag(id: number) {
    this.filters.business_type = id;
    this.store.dispatch(new UpdateBusinessFilters(Object.assign({}, this.filters)));
    this.store.dispatch(new GetSearchBusiness(this.filters));
  }

  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
