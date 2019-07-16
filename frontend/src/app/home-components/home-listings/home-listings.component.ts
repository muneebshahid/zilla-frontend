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
import { selectProductsNumHits } from "src/app/store/selectors/product";

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
  public businessNumHitSelector = this.store.pipe(select(selectBusinessNumHits));
  public productsNumHitSelector = this.store.pipe(select(selectProductsNumHits));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));

  private subscriptionsArr: Subscription[] = [];
  public showingBusinesses = true;
  public searchDistance = 0;

  public businessHits = 0;
  public productHits = 0;
  public selectedCategory = "Business";

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
              marker.id,
              this.mapComponent.normalMarkerIcon
            )
          );
        }
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

        if (this.showingBusinesses) {
          this.hits = this.businessHits;
          this.selectedCategory = "Businesses";
        } else {
          this.hits = this.productHits;
          this.selectedCategory = "Products";
        }
      }
    );
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.searchDistance = filters.latlondis[2];
    });

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(businessNumHitSubscriber);
    this.subscriptionsArr.push(businessMarkers);
    this.subscriptionsArr.push(productsNumHitSubscriber);
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
