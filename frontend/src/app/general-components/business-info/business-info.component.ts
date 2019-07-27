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
export class BusinessInfoComponent implements OnInit, OnDestroy {
  @Input() public homePage = false;
  @ViewChildren("businessesParentTag") businessesParentTag: QueryList<any>;
  private subscriptionsArr: Subscription[] = [];

  public businessesSelector = this.store
    .pipe(select(selectBusinesses))
    .subscribe(business => this.businessService.setBusinesses(business));

  public businessFilterSelector = this.store
    .pipe(select(selectBusinessFilter))
    .subscribe(filter => this.businessService.setBusinessFilter(filter));

  public generalFiltersSelector = this.store
    .pipe(select(selectGeneralFilters))
    .subscribe(filter => this.generalService.setGeneralFilters(filter));

  public endpoint = environment.apiEndpoint;

  constructor(
    private store: Store<IAppState>,
    private filterService: FiltersService,
    private businessService: BusinessService,
    private generalService: GeneralService
  ) {}

  ngOnInit() {
    this.subscriptionsArr.push(this.businessesSelector);
    this.subscriptionsArr.push(this.businessFilterSelector);
    this.subscriptionsArr.push(this.generalFiltersSelector);
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
