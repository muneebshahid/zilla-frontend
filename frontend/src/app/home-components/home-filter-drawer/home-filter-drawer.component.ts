import { GetBusinessAmenities, GetBusinessTypes } from "./../../store/actions/business";
import { IBFilters } from "./../../models/business_filters";
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { GetSearchBusiness } from "src/app/store/actions/business";
import { UpdateSearchType } from "src/app/store/actions/general";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { IPFilters } from "src/app/models/product_filters";
import {
  selectProductFilter,
  selectProductTypes,
  selectProductTags
} from "src/app/store/selectors/product";
import {
  selectBusinessFilter,
  selectBusinessAmenities,
  selectBusinessTypes
} from "src/app/store/selectors/business";
import { GetProductTypes, GetProductTags } from "src/app/store/actions/product";
import { ITags } from "src/app/models/tags";
import { IPType } from "src/app/models/ptype";
import { IAmenities } from "src/app/models/amenities";
import { IBType } from "src/app/models/btype";

@Component({
  selector: "app-home-filter-drawer",
  templateUrl: "./home-filter-drawer.component.html",
  styleUrls: ["./home-filter-drawer.component.css"]
})
export class HomeFilterDrawerComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptionsArr: Subscription[] = [];
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public productsFilterSelector = this.store.pipe(select(selectProductFilter));
  public businessesFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public productTypesSelector = this.store.pipe(select(selectProductTypes));
  public productTagsSelector = this.store.pipe(select(selectProductTags));

  public businessesTypesSelector = this.store.pipe(select(selectBusinessTypes));
  public businessesAmenitiesSelector = this.store.pipe(select(selectBusinessAmenities));

  public businessFilters: IBFilters;
  public productsFilters: IPFilters;
  public productTypes: IPType[];
  public businessTypes: IBType[];
  public businessAmenities: IAmenities[];
  public productTags: ITags[];

  public selectedBusinessType;
  public selectedProductType;

  public selectedTags;

  public showingBusinesses: boolean = true;
  public distanceControlShowing: boolean = true;
  @ViewChild("searchDistance") searchDistance: ElementRef;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    this.getInitialResults();
    this.initializeSubscribers();
    this.dispatchActions();
  }

  initializeSubscribers() {
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
        if (this.showingBusinesses) {
          this.distanceControlShowing = true;
        } else {
          this.distanceControlShowing = false;
        }
      }
    );

    const productsFilterSubscriber = this.productsFilterSelector.subscribe(filter => {
      this.productsFilters = filter;
    });
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessFilters = filter;
    });

    const businessAmenitiesSubscriber = this.businessesAmenitiesSelector.subscribe(amenities => {
      const amenitiesCheckbox = [];

      for (const key in amenities) {
        amenitiesCheckbox.push({
          tag: amenities[key].tag,
          id: amenities[key].id,
          icon: amenities[key].icon,
          checked: false
        });
      }
      this.businessAmenities = amenitiesCheckbox;
      this.selectedTags = amenitiesCheckbox;
    });
    const businessTypesSubscriber = this.businessesTypesSelector.subscribe(types => {
      const businessTypesCheckbox = [];
      for (const key in types) {
        businessTypesCheckbox.push({
          name: types[key].tag,
          id: types[key].id,
          icon: types[key].icon
        });
      }
      this.businessTypes = businessTypesCheckbox;
    });

    const productTypesSubscriber = this.productTypesSelector.subscribe(product_types => {
      this.productTypes = product_types;
    });
    const productTagsSubscriber = this.productTagsSelector.subscribe(product_tags => {
      this.productTags = product_tags;
    });
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(productTagsSubscriber);
    this.subscriptionsArr.push(productTypesSubscriber);
    this.subscriptionsArr.push(businessTypesSubscriber);
    this.subscriptionsArr.push(businessAmenitiesSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(productsFilterSubscriber);
  }

  ngAfterViewInit() {}

  dispatchActions() {
    this.store.dispatch(new GetBusinessAmenities());
    this.store.dispatch(new GetBusinessTypes());
    this.store.dispatch(new GetProductTypes());
    this.store.dispatch(new GetProductTags());
  }

  getInitialResults() {
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.businessFilters.latlondis[0] = pos.coords.latitude;
      this.businessFilters.latlondis[1] = pos.coords.longitude;
      this.searchBusinesses(this.businessFilters);
    });
  }
  getIdsOfSelectedTags(tagsArray: any) {
    const tags = [];
    for (const tag of tagsArray) {
      if (tag.checked) {
        tags.push(tag.id);
      }
    }
    return tags;
  }

  applyFilters() {
    if (this.showingBusinesses) {
      this.businessFilters.latlondis[2] = this.searchDistance.nativeElement.value;
      console.log(this.businessFilters);
      // this.businessFilters.amenities = this.getIdsOfSelectedTags(this.selectedTags);
      // this.businessFilters.business_type = this.selectedBusinessType;
      this.searchBusinesses(this.businessFilters);
    } else {
      // this.store.dispatch(new GetSearchProducts(this.productsFilters));
    }
  }

  toggleCheckbox(idx: number) {
    this.selectedTags[idx].checked = !this.selectedTags[idx].checked;
  }

  searchBusinesses(params: any) {
    this.store.dispatch(new UpdateSearchType({ showingBusinesses: true }));
    this.store.dispatch(new GetSearchBusiness(params));
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
