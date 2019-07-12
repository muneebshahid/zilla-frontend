import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { select, Store, defaultMemoize } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import {
  selectNumHits,
  selectBusinesses,
  selectBusinessMarkers
} from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";
import { MapComponent } from "src/app/general-components";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { GetSearchBusiness, GetBusinessDetail } from "src/app/store/actions/business";
import { GetSearchProducts } from "src/app/store/actions/product";

@Component({
  selector: "app-home-listings",
  templateUrl: "./home-listings.component.html",
  styleUrls: ["./home-listings.component.css"]
})
export class HomeListingsComponent implements OnInit, OnDestroy {
  @Output() public setMobileMapView = new EventEmitter<string>();
  @Output() public highlightMarkerOnGridItemHoverEvent = new EventEmitter<any>();
  @Input() public mapComponent: MapComponent;

  public searchDistance = 1000000000;
  public businessMarkersSelector = this.store.pipe(select(selectBusinessMarkers));
  public businessSelector = this.store.pipe(select(selectBusinesses));
  public numHitSelector = this.store.pipe(select(selectNumHits));
  public businesses: IBusiness[];
  public showingBusinesses = true;
  public hits: number = 0;
  private subscriptionsArr: Subscription[] = [];
  public filters: any;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  searchType = "Business";

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
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.searchBusinesses({
        latlondis: `${pos.coords.latitude},${pos.coords.longitude},${this.searchDistance}`
      });
    });

    const businessSubscriber = this.businessSelector.subscribe(businesses => {
      console.log(businesses);
      this.businesses = businesses;
    });
    const numHitSubscriber = this.numHitSelector.subscribe(numHits => {
      this.hits = numHits;
    });

    this.subscriptionsArr.push(businessSubscriber);
    this.subscriptionsArr.push(numHitSubscriber);
    this.subscriptionsArr.push(businessMarkers);
  }
  searchProducts(params: any) {
    this.showingBusinesses = false;
    this.store.dispatch(new GetSearchProducts(params));
  }

  searchBusinesses(params: any) {
    this.showingBusinesses = true;
    this.store.dispatch(new GetSearchBusiness(params));
  }

  accumulateFilters(showBusinesses: boolean) {
    /* accumulate filters here */

    if (showBusinesses) {
      this.searchBusinesses({});
    } else {
      this.searchProducts({});
    }
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
