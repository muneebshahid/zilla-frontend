import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input, OnDestroy, Output, EventEmitter } from "@angular/core";
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
export class BusinessInfoComponent implements OnInit, OnDestroy {
  @Input() public homePage = false;
  @Output() public numberOfShownBusinesses = new EventEmitter<number>();
  public subscriptionsArr: Subscription[] = [];

  public firstCall: boolean = true;

  public businessesSelector = this.store.pipe(select(selectBusinesses));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));
  public endpoint = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private filterService: FiltersService,
    public businessService: BusinessService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    const businessSubscriber = this.businessesSelector.subscribe(businesses => {
      this.numberOfShownBusinesses.emit(businesses.length);
      console.log(businesses);
      if (businesses.length > 0 && this.firstCall) {
        this.firstCall = false;
        // open the detail drawer once the business-array is loaded.
        if (this.businessService.getPendingDetailID() !== null) {
          this.businessService.dispatchGetBusinessDetail(this.businessService.getPendingDetailID());
        }
      }
    });

    const generalFilterSubscriber = this.generalFiltersSelector.subscribe(filters =>
      this.generalService.setGeneralFilters(filters)
    );

    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filter =>
      this.businessService.setBusinessFilter(filter)
    );

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(generalFilterSubscriber);
    this.subscriptionsArr.push(businessSubscriber);
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
  openDetailDrawer(id: number) {
    this.businessService.dispatchGetBusinessDetail(id);
  }

  updateTypeSelection(id: number) {
    this.businessService.setBusinessFilterTypes(
      this.filterService.selectTypeInFilter(this.businessService.getBusinessFilterTypes(), id)
    );
  }

  searchByBusinessType(id: number) {
    this.updateTypeSelection(id);

    this.businessService.updateBusinessFilters();
    this.businessService.dispatchSearchBusinesses(this.generalService.getGeneralFilters());
  }

  highlightMarker(id: number, highlight: boolean) {
    // this.store.dispatch(
    //   new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    // );
  }
}
