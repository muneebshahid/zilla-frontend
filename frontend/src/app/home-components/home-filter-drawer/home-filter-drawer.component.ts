import {
  GetBusinessAmenities,
  GetBusinessTypes,
  UpdateBusinessFilters
} from "./../../store/actions/business";
import { IBFilters } from "./../../models/business_filters";
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { GetSearchBusiness } from "src/app/store/actions/business";
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
import {
  GetProductTypes,
  GetProductTags,
  GetSearchProducts,
  UpdateProductFilters
} from "src/app/store/actions/product";
import { FiltersService } from "src/app/services/filters/filters.service";

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

  public businessFilters: IBFilters = null;
  public productsFilters: IPFilters = null;

  public selectedTags;
  public selectedTypes;

  /* represents the id of the selected item in dropdown. */
  public selectedTypeID = null;

  /*
    this will help us make http call the first time user selects the products tab. After that,
    the products will only be updated when user applies a filter or search on searchbox.
  */
  public productsRetrieved: boolean = false;

  public showingBusinesses: boolean = true;
  public filterTypeText: string;
  @ViewChild("searchDistance") searchDistance: ElementRef;

  constructor(
    private store: Store<IAppState>,
    private geoLocationService: GeoLocationService,
    private filterService: FiltersService
  ) {}

  ngOnInit() {
    this.setInitialLatLon();
    this.initializeSubscribers();
    this.dispatchActions();
  }

  saveBusinessFiltersState() {
    this.businessFilters.business_types = this.filterService.selectTypeInFilter(
      this.businessFilters.business_types,
      this.selectedTypeID
    );
    this.businessFilters.amenities = this.selectedTags;

    if (this.searchDistance !== undefined) {
      this.businessFilters.latlondis[2] = this.searchDistance.nativeElement.value;
    }
  }
  saveProductFilterState() {
    this.productsFilters.product_types = this.filterService.selectTypeInFilter(
      this.productsFilters.product_types,
      this.selectedTypeID
    );
    this.productsFilters.tags = this.selectedTags;
  }

  setProductDrawerFilters() {
    if (this.businessFilters !== null && this.productsFilters !== null) {
      this.saveBusinessFiltersState();

      this.selectedTags = this.productsFilters.tags;
      this.selectedTypes = this.productsFilters.product_types;
      this.selectedTypeID = this.filterService.getSelectedTypeID(
        this.productsFilters.product_types
      );
      this.filterTypeText = "Product Type";
    }
  }

  setBusinessDrawerFilters() {
    if (this.productsFilters !== null && this.businessFilters !== null) {
      this.saveProductFilterState();

      this.selectedTags = this.businessFilters.amenities;
      this.selectedTypes = this.businessFilters.business_types;
      this.selectedTypeID = this.filterService.getSelectedTypeID(
        this.businessFilters.business_types
      );

      this.filterTypeText = "Business Type";
    }
  }

  initializeSubscribers() {
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessFilters = filter;
      this.setBusinessDrawerFilters();
    });
    const productsFilterSubscriber = this.productsFilterSelector.subscribe(filter => {
      this.productsFilters = filter;
      this.setProductDrawerFilters();
    });
    /* this subscribe will be called whenever we switch tabs b/w business and products */
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
        if (this.showingBusinesses) {
          this.setBusinessDrawerFilters();
        } else {
          this.setProductDrawerFilters();
          if (!this.productsRetrieved) {
            this.productsRetrieved = !this.productsRetrieved;
            this.searchProducts(this.productsFilters);
          }
        }
      }
    );

    const businessAmenitiesSubscriber = this.businessesAmenitiesSelector.subscribe(amenities => {
      this.businessFilters.amenities = this.getCheckboxVersionOfFilters(amenities);
      this.selectedTags = this.businessFilters.amenities;
    });
    const businessTypesSubscriber = this.businessesTypesSelector.subscribe(businessTypes => {
      this.businessFilters.business_types = this.getDropDownVersionOfFilters(businessTypes);
      this.selectedTypes = this.businessFilters.business_types;
    });

    const productTypesSubscriber = this.productTypesSelector.subscribe(productTypes => {
      this.productsFilters.product_types = this.getDropDownVersionOfFilters(productTypes);
    });
    const productTagsSubscriber = this.productTagsSelector.subscribe(productTags => {
      this.productsFilters.tags = this.getCheckboxVersionOfFilters(productTags);
    });
    this.subscriptionsArr.push(showingBusinessesSubscriber);
    this.subscriptionsArr.push(productTagsSubscriber);
    this.subscriptionsArr.push(productTypesSubscriber);
    this.subscriptionsArr.push(businessTypesSubscriber);
    this.subscriptionsArr.push(businessAmenitiesSubscriber);
    this.subscriptionsArr.push(businessFilterSubscriber);
    this.subscriptionsArr.push(productsFilterSubscriber);
  }

  getCheckboxVersionOfFilters(items: any) {
    const itemsCheckbox = [];

    for (const key in items) {
      itemsCheckbox.push({
        tag: items[key].tag,
        id: items[key].id,
        checked: false
      });
    }
    return itemsCheckbox;
  }

  getDropDownVersionOfFilters(items: any) {
    const itemsDropdown = [];

    for (const key in items) {
      itemsDropdown.push({
        name: items[key].tag,
        id: items[key].id,
        selected: false
      });
    }
    return itemsDropdown;
  }

  ngAfterViewInit() {}

  dispatchActions() {
    this.store.dispatch(new GetBusinessAmenities());
    this.store.dispatch(new GetBusinessTypes());
    this.store.dispatch(new GetProductTypes());
    this.store.dispatch(new GetProductTags());
  }

  setInitialLatLon() {
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.businessFilters.latlondis[0] = pos.coords.latitude;
      this.businessFilters.latlondis[1] = pos.coords.longitude;
      this.productsFilters.latlondis[0] = pos.coords.latitude;
      this.productsFilters.latlondis[1] = pos.coords.longitude;
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
      this.saveBusinessFiltersState();
      this.searchBusinesses(this.businessFilters);
    } else {
      this.saveProductFilterState();
      this.searchProducts(this.productsFilters);
    }
  }

  toggleCheckbox(idx: number) {
    this.selectedTags[idx].checked = !this.selectedTags[idx].checked;
  }

  searchBusinesses(params: any) {
    this.store.dispatch(new UpdateBusinessFilters(params));
    this.store.dispatch(new GetSearchBusiness(params));
  }
  searchProducts(params: any) {
    this.store.dispatch(new UpdateProductFilters(params));
    this.store.dispatch(new GetSearchProducts(params));
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
