import { selectBusinessFilter } from "./../../store/selectors/business";
import { UpdateSearchType } from "./../../store/actions/general";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import {
  selectNumHits,
  selectBusinesses,
  selectBusinessMarkers
} from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";
import { MapComponent } from "src/app/general-components";
import { selectShowingBusinesses } from "src/app/store/selectors/general";

@Component({
  selector: "app-home-listings",
  templateUrl: "./home-listings.component.html",
  styleUrls: ["./home-listings.component.css"]
})
export class HomeListingsComponent implements OnInit, OnDestroy {
  @Output() public setMobileMapView = new EventEmitter<string>();
  @Output() public highlightMarkerOnGridItemHoverEvent = new EventEmitter<any>();
  @Input() public mapComponent: MapComponent;

  public businessMarkersSelector = this.store.pipe(select(selectBusinessMarkers));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public numHitSelector = this.store.pipe(select(selectNumHits));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));

  private subscriptionsArr: Subscription[] = [];
  public showingBusinesses = true;
  public businesses: IBusiness[];
  public searchDistance = 0;
  public hits: number = 0;
  public filters: any;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const businessMarkers = this.businessMarkersSelector.subscribe(markers => {
      if (markers !== null) {
        for (const marker of markers) {
          this.mapComponent.markers.push(
            this.mapComponent.createMarker(
              marker.latlon[0],
              marker.latlon[1],
              marker.slug,
              marker.id,
              this.mapComponent.normalMarkerIcon
            )
          );
        }
      }
    });

    const numHitSubscriber = this.numHitSelector.subscribe(numHits => {
      this.hits = numHits;
    });
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
      }
    );
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.searchDistance = filters.latlondis[2];
    });

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(numHitSubscriber);
    this.subscriptionsArr.push(businessMarkers);
  }

  searchProducts() {
    this.showingBusinesses = false;
    this.store.dispatch(new UpdateSearchType({ showingBusinesses: this.showingBusinesses }));
  }

  searchBusinesses() {
    this.showingBusinesses = true;
    this.store.dispatch(new UpdateSearchType({ showingBusinesses: this.showingBusinesses }));
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
