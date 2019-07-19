import { FiltersService } from "src/app/services/filters/filters.service";
import { IBFilters } from "src/app/models/business_filters";
import { filter } from "rxjs/operators";
import { selectBusinessFilter, selectBusinessNumHits } from "./../../store/selectors/business";
import { UpdateSearchType } from "./../../store/actions/general";
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { selectBusinessMarkers } from "src/app/store/selectors/business";
import { MapComponent } from "src/app/general-components";
import { selectShowingBusinesses, selectGeneralFilters } from "src/app/store/selectors/general";
import {
  selectProductsNumHits,
  selectProductMarkers,
  selectProductFilter
} from "src/app/store/selectors/product";
import { BusinessService } from "src/app/services/business/business.service";
import { IPFilters } from "src/app/models/product_filters";
import { IGFilters } from "src/app/models/general_filters";
import { ProductService } from "src/app/services/product/product.service";
import { GeneralService } from "src/app/services/general/general.service";
import { IFilterChips } from "src/app/models/filterchips";
import { UpdateBusinessFilters, GetSearchBusiness } from "src/app/store/actions/business";
import { UpdateProductFilters, GetSearchProducts } from "src/app/store/actions/product";

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
  public businessNumHitSelector = this.store.pipe(select(selectBusinessNumHits));
  public productsNumHitSelector = this.store.pipe(select(selectProductsNumHits));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public businessFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public productFilterSelector = this.store.pipe(select(selectProductFilter));
  public generalFilterSelector = this.store.pipe(select(selectGeneralFilters));

  private subscriptionsArr: Subscription[] = [];
  public showingBusinesses = true;
  public searchDistance = 0;
  public selectedFilters = [];

  public businessHits = 0;
  public productHits = 0;
  public selectedCategory = "Business";

  public businessMarkers: any = null;
  public productMarkers: any = null;

  public selectedFilterChips: IFilterChips[] = [];
  public businessFilterChips: IFilterChips[] = [];
  public productFilterChips: IFilterChips[] = [];
  public generalFilterChips: IFilterChips[] = [];

  public originalBusinessFilter: IBFilters;
  public originalProductFilter: IPFilters;
  public originalGeneralFilter: IGFilters;

  public hits: number = 0;
  public filters: any;

  constructor(
    private store: Store<IAppState>,
    private businessService: BusinessService,
    private generalService: GeneralService,
    private productService: ProductService,
    private filterService: FiltersService
  ) {}

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
          this.selectedFilterChips = this.businessFilterChips;
          this.hits = this.businessHits;
          this.selectedCategory = "Businesses";

          if (this.businessMarkers !== null) {
            this.putMarkersOnMap(this.businessMarkers);
          }
        } else {
          this.selectedFilterChips = this.productFilterChips;
          this.hits = this.productHits;
          this.selectedCategory = "Products";
          if (this.productMarkers !== null) {
            this.putMarkersOnMap(this.productMarkers);
          }
        }
      }
    );
    const businessFilterSubscriber = this.businessFilterSelector.subscribe(filters => {
      this.businessFilterChips = [];
      this.businessFilterChips = this.businessService.getFilterChips(filters);
      this.selectedFilterChips = this.businessFilterChips;
      this.originalBusinessFilter = filters;
      console.log(filters);
    });
    const productFilterSubscriber = this.productFilterSelector.subscribe(filters => {
      this.productFilterChips = [];
      this.productFilterChips = this.productService.getFilterChips(filters);
      this.selectedFilterChips = this.productFilterChips;
      this.originalProductFilter = filters;
      console.log(filters);
    });
    const generalFilterSubscriber = this.generalFilterSelector.subscribe(filters => {
      this.generalFilterChips = [];
      this.generalFilterChips = this.generalService.getFilterChips(filters);
      this.originalGeneralFilter = filters;
    });

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(businessNumHitSubscriber);
    this.subscriptionsArr.push(businessMarkersSubscriber);
    this.subscriptionsArr.push(productsNumHitSubscriber);
    this.subscriptionsArr.push(productMarkersSubscriber);
    this.subscriptionsArr.push(generalFilterSubscriber);
    this.subscriptionsArr.push(productFilterSubscriber);
  }

  deSelectFilterFromOriginal(key, id, original) {
    if (key === "amenities" || key === "tags") {
      original[key] = this.filterService.deSelectTagFilter(original[key], id);
    } else if (key === "business_types" || key === "product_types") {
      original[key] = this.filterService.deSelectTypeInFilter(original[key], id);
    }
    return original;
  }

  /* remove filter from the originalFilter so that we can update it in store for other components to know. */
  removeFilter(key, id) {
    let newFilterChips = [];
    for (let i = 0; i < this.selectedFilterChips.length; i++) {
      if (this.selectedFilterChips[i].key === key && this.selectedFilterChips[i].id === id) {
        if (this.showingBusinesses) {
          this.originalBusinessFilter = this.deSelectFilterFromOriginal(
            key,
            id,
            this.originalBusinessFilter
          );
          this.store.dispatch(
            new UpdateBusinessFilters(Object.assign({}, this.originalBusinessFilter))
          );
          this.store.dispatch(
            new GetSearchBusiness({
              businessParams: this.originalBusinessFilter,
              generalParams: this.originalGeneralFilter
            })
          );
        } else {
          this.originalProductFilter = this.deSelectFilterFromOriginal(
            key,
            id,
            this.originalProductFilter
          );
          this.store.dispatch(
            new UpdateProductFilters(Object.assign({}, this.originalProductFilter))
          );
          this.store.dispatch(
            new GetSearchProducts({
              productParams: this.originalProductFilter,
              generalParams: this.originalGeneralFilter
            })
          );
        }
      } else {
        newFilterChips.push(this.selectedFilterChips[i]);
      }
    }

    if (this.showingBusinesses) {
      this.businessFilterChips = newFilterChips;
    } else {
      this.productFilterChips = newFilterChips;
    }

    this.selectedFilterChips = newFilterChips;
  }
  removeGeneralFilter(type) {
    this.generalFilterChips = this.generalFilterChips.filter(function(value, index, arr) {
      if (value.key === type) {
        return false;
      }
      return true;
    });
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

  updateMobileMapView() {
    this.setMobileMapView.next("setMobileMapView");
  }
}
