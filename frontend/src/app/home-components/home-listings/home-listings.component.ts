import { selectDefaultLatLonDis, selectDefaultCity } from "./../../store/selectors/general";
import { FiltersService } from "src/app/services/filters/filters.service";
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
import { ProductService } from "src/app/services/product/product.service";
import { GeneralService } from "src/app/services/general/general.service";
import { IFilterChips } from "src/app/models/filterchips";
import { GetSearchBusiness } from "src/app/store/actions/business";
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

  public businessMarkersSelector = this.store.pipe(select(selectBusinessMarkers));
  public productMarkersSelector = this.store.pipe(select(selectProductMarkers));
  public businessNumHitSelector = this.store.pipe(select(selectBusinessNumHits));
  public productsNumHitSelector = this.store.pipe(select(selectProductsNumHits));
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public defaultLatLonDisSelector = this.store.pipe(select(selectDefaultLatLonDis));
  public defaultCitySelector = this.store.pipe(select(selectDefaultCity));
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

  public defaultCity: string;

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
    const defaultCitySubscriber = this.defaultCitySelector.subscribe(city => {
      this.generalService.setDefaultCity(city);
    });

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
      this.businessFilterChips = this.businessService.getFilterChips(filters);
      this.selectedFilterChips = Object.assign([], this.businessFilterChips);
      this.businessService.setOriginalBusinessFilter(filters);
    });
    const productFilterSubscriber = this.productFilterSelector.subscribe(filters => {
      this.productFilterChips = this.productService.getFilterChips(filters);
      this.selectedFilterChips = Object.assign([], this.productFilterChips);
      this.productService.setOriginalProductFilter(filters);
    });
    const defaultLatLonDisSubscriber = this.defaultLatLonDisSelector.subscribe(defaultLatLonDis => {
      this.generalService.setDefaultLatLonDis(defaultLatLonDis);
    });
    const generalFilterSubscriber = this.generalFilterSelector.subscribe(filters => {
      this.generalFilterChips = this.generalService.getFilterChips(filters);
      this.generalService.setOriginalFilter(filters);
    });

    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(businessNumHitSubscriber);
    this.subscriptionsArr.push(defaultLatLonDisSubscriber);
    this.subscriptionsArr.push(businessMarkersSubscriber);
    this.subscriptionsArr.push(productsNumHitSubscriber);
    this.subscriptionsArr.push(productMarkersSubscriber);
    this.subscriptionsArr.push(generalFilterSubscriber);
    this.subscriptionsArr.push(productFilterSubscriber);
    this.subscriptionsArr.push(defaultCitySubscriber);
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
    for (let i = 0; i < this.selectedFilterChips.length; i++) {
      if (this.selectedFilterChips[i].key === key && this.selectedFilterChips[i].id === id) {
        if (this.showingBusinesses) {
          let originalBusinessFilter = this.deSelectFilterFromOriginal(
            key,
            id,
            this.businessService.getOriginalBusinessFilter()
          );
          this.businessService.updateBusinessFilters(originalBusinessFilter);
          this.getSearchBusinesses({
            businessParams: originalBusinessFilter,
            generalParams: this.generalService.getOriginalFilter()
          });
        } else {
          let originalProductFilter = this.deSelectFilterFromOriginal(
            key,
            id,
            this.productService.getOriginalProductFilter()
          );
          this.productService.updateProductFilters(originalProductFilter);
          this.getSearchProducts({
            productParams: originalProductFilter,
            generalParams: this.generalService.getOriginalFilter()
          });
        }
      }
    }
  }

  getSearchProducts(params: any) {
    this.store.dispatch(new GetSearchProducts(params));
  }
  getSearchBusinesses(params: any) {
    this.store.dispatch(new GetSearchBusiness(params));
  }

  removeGeneralFilter(type) {
    console.log("bcancel");
    console.log(this.generalService.getOriginalFilter());
    let originalGeneralFilter = this.generalService.removeGeneralFilter(
      this.generalFilterChips,
      type
    );

    this.generalService.updateGeneralFilters(originalGeneralFilter);
    console.log("cancel");
    console.log(originalGeneralFilter);

    this.showingBusinesses
      ? this.getSearchBusinesses({
          businessParams: this.businessService.getOriginalBusinessFilter(),
          generalParams: originalGeneralFilter
        })
      : this.getSearchProducts({
          productParams: this.productService.getOriginalProductFilter(),
          generalParams: originalGeneralFilter
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
