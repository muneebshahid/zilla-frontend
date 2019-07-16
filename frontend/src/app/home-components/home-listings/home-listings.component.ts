import { selectBusinessFilter, selectBusinessNumHits } from "./../../store/selectors/business";
import { UpdateSearchType } from "./../../store/actions/general";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { selectBusinessMarkers } from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";
import { MapComponent } from "src/app/general-components";
import { selectShowingBusinesses } from "src/app/store/selectors/general";
import { selectProductsNumHits, selectProductMarkers } from "src/app/store/selectors/product";

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
  public productMarkersSelector = this.store.pipe(select(selectProductMarkers));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public businessNumHitSelector = this.store.pipe(select(selectBusinessNumHits));
  public productsNumHitSelector = this.store.pipe(select(selectProductsNumHits));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));

  private subscriptionsArr: Subscription[] = [];
  public showingBusinesses = true;
  public searchDistance = 0;

  public businessHits = 0;
  public productHits = 0;
  public selectedCategory = "Business";

  public businessMarkers: any = null;
  public productMarkers: any = null;

  public hits: number = 0;
  public filters: any;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const businessMarkersSubscriber = this.businessMarkersSelector.subscribe(markers => {
      if (markers !== null) {
        this.mapComponent.markers = [];
        this.businessMarkers = markers;
        this.putMarkersOnMap(markers);
      }
    });
    const productMarkersSubscriber = this.productMarkersSelector.subscribe(markers => {
      if (markers !== null) {
        this.mapComponent.markers = [];
        this.productMarkers = markers;
        this.putMarkersOnMap(markers);
      }
    });

    const businessNumHitSubscriber = this.businessNumHitSelector.subscribe(numHits => {
      this.businessHits = numHits;
      this.hits = numHits;
    });
    const productsNumHitSubscriber = this.productsNumHitSelector.subscribe(numHits => {
      this.productHits = numHits;
      this.hits = numHits;
    });
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
        this.mapComponent.markers = [];
        if (this.showingBusinesses) {
          this.hits = this.businessHits;
          this.selectedCategory = "Businesses";
          this.putMarkersOnMap(this.businessMarkers);
        } else {
          this.hits = this.productHits;
          this.selectedCategory = "Products";
          this.putMarkersOnMap(this.productMarkers);
        }
      }
    );
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.searchDistance = filters.latlondis[2];
    });

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(businessNumHitSubscriber);
    this.subscriptionsArr.push(businessMarkersSubscriber);
    this.subscriptionsArr.push(productsNumHitSubscriber);
    this.subscriptionsArr.push(productMarkersSubscriber);
  }

  putMarkersOnMap(markers: any) {
    for (const marker of markers) {
      this.mapComponent.markers.push(
        this.mapComponent.createMarker(
          marker.latlon[0],
          marker.latlon[1],
          marker.id,
          this.mapComponent.normalMarkerIcon
        )
      );
    }
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
