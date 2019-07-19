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
import { FiltersService } from "src/app/services/filters/filters.service";
import { selectGeneralFilters } from "src/app/store/selectors/general";
import { IGFilters } from "src/app/models/general_filters";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit, OnDestroy {
  @Input() public homePage = false;
  private subscriptionsArr: Subscription[] = [];
  public businessesSelector = this.store.pipe(select(selectBusinesses));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));
  public businesses: IBusiness[];

  public endpoint = environment.apiEndpoint;
  public bfilters: IBFilters = null;
  public gfilters: IGFilters = null;

  constructor(private store: Store<IAppState>, private filterService: FiltersService) {}

  ngOnInit() {
    const businessSubscriber = this.businessesSelector.subscribe(businesses => {
      this.businesses = businesses;
    });
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.bfilters = filters;
    });
    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filters => {
      this.gfilters = filters;
    });

    this.subscriptionsArr.push(businessSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(generalFiltersSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
  openDetailDrawer(id: number) {
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }

  updateBusinessTypeSelection(id: number) {
    this.bfilters.business_types = this.filterService.selectTypeInFilter(
      this.bfilters.business_types,
      id
    );
  }

  searchByTag(id: number) {
    this.updateBusinessTypeSelection(id);
    this.store.dispatch(new UpdateBusinessFilters(Object.assign({}, this.bfilters)));
    this.store.dispatch(
      new GetSearchBusiness({ businessParams: this.bfilters, generalParams: this.gfilters })
    );
  }

  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
