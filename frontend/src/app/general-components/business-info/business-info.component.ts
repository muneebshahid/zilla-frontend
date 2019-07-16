import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { Subscription } from "rxjs";
import { selectBusinesses } from "src/app/store/selectors/business";
import { HighlightMapMarker } from "src/app/store/actions/general";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit, OnDestroy {
  private subscriptionsArr: Subscription[] = [];
  public businessesSelector = this.store.pipe(select(selectBusinesses));
  public businesses: IBusiness[];
  @Input() public homePage = false;

  public endpoint = environment.apiEndpoint;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const businessSubscriber = this.businessesSelector.subscribe(businesses => {
      this.businesses = businesses;
    });

    this.subscriptionsArr.push(businessSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }

  openDetailDrawer(id: number) {
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }
  highlightMarker(id: number, highlight: boolean) {
    this.store.dispatch(
      new HighlightMapMarker({ highlightedMarkerID: id, highlighted: highlight })
    );
  }
}
