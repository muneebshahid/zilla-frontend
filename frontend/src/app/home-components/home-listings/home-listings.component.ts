import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { selectNumHits, selectBusinesses } from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";

@Component({
  selector: "app-home-listings",
  templateUrl: "./home-listings.component.html",
  styleUrls: ["./home-listings.component.css"]
})
export class HomeListingsComponent implements OnInit, OnDestroy {
  @Output() public setMobileMapView = new EventEmitter<string>();
  @Output() public highlightMarkerOnGridItemHoverEvent = new EventEmitter<any>();

  public businessSelector = this.store.pipe(select(selectBusinesses));
  public numHitSelector = this.store.pipe(select(selectNumHits));
  public businesses: IBusiness[];
  public showingBusinesses = true;
  public hits: number = 0;
  private subscriptionsArr: Subscription[] = [];

  constructor(private store: Store<IAppState>) {}

  searchType = "Business";

  ngOnInit() {
    const businessSubscriber = this.businessSelector.subscribe(businesses => {
      this.businesses = businesses;
    });
    const numHitSubscriber = this.numHitSelector.subscribe(numHits => {
      this.hits = numHits;
    });

    this.subscriptionsArr.push(businessSubscriber);
    this.subscriptionsArr.push(numHitSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }

  highlightMarkerOnGridItemHover(obj: any) {
    this.highlightMarkerOnGridItemHoverEvent.next(obj);
  }

  updateMobileMapView() {
    this.setMobileMapView.next("setMobileMapView");
  }
}
