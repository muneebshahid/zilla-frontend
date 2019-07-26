import {
  Component,
  OnInit,
  Input,
  OnDestroy,
  QueryList,
  ViewChildren,
  AfterViewChecked,
  AfterViewInit
} from "@angular/core";
import { environment } from "src/environments/environment";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectBusinesses, selectBusinessFilter } from "src/app/store/selectors/business";
import { HighlightMapMarker } from "src/app/store/actions/general";
import { FiltersService } from "src/app/services/filters/filters.service";
import { selectGeneralFilters } from "src/app/store/selectors/general";
import { BusinessService } from "src/app/services/business/business.service";
import { GeneralService } from "src/app/services/general/general.service";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit, OnDestroy, AfterViewInit {
  @Input() public homePage = false;
  @ViewChildren("businessesParentTag") businessesParentTag: QueryList<any>;
  private subscriptionsArr: Subscription[] = [];
  public businessesSelector = this.store.pipe(select(selectBusinesses));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));

  public endpoint = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private filterService: FiltersService,
    private businessService: BusinessService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.subscriptions();
  }

  businessResultsRendered() {
    this.generalService.updateLoadingSign(false);
  }
  ngAfterViewInit() {
    this.businessesParentTag.changes.subscribe(t => {
      this.businessResultsRendered();
    });
  }
  subscriptions() {
    const businessSelectorSubscriber = this.businessesSelector.subscribe(business => {
      this.businessService.setBusinesses(business);
    });
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.businessService.setBusinessFilter(filters);
    });
    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filters => {
      this.generalService.setGeneralFilters(filters);
    });

    this.subscriptionsArr.push(businessSelectorSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(generalFiltersSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
  openDetailDrawer(id: number) {
    this.businessService.dispatchGetBusinessDetail(id);
  }

  updateBusinessTypeSelection(id: number) {
    this.businessService.setBusinessFilterTypes(
      this.filterService.selectTypeInFilter(this.businessService.getBusinessFilterTypes(), id)
    );
  }

  searchByTag(id: number) {
    this.updateBusinessTypeSelection(id);

    this.businessService.updateBusinessFilters();
    this.businessService.dispatchSearchBusinesses(this.generalService.getGeneralFilters());
  }

  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
