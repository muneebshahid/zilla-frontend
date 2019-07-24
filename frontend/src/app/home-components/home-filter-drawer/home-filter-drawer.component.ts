import { GetBusinessAmenities, GetBusinessTypes } from "./../../store/actions/business";
import { IBFilters } from "./../../models/business_filters";
import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses, selectGeneralFilters } from "src/app/store/selectors/general";
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
import { GetProductTypes, GetProductTags, GetSearchProducts } from "src/app/store/actions/product";
import { FiltersService } from "src/app/services/filters/filters.service";
import { IGFilters } from "src/app/models/general_filters";
import { UpdateDefaultLatLonDis } from "src/app/store/actions/general";
import { GeneralService } from "src/app/services/general/general.service";
import { BusinessService } from "src/app/services/business/business.service";
import { ProductService } from "src/app/services/product/product.service";

declare var jQuery: any;

@Component({
  selector: "app-home-filter-drawer",
  templateUrl: "./home-filter-drawer.component.html",
  styleUrls: ["./home-filter-drawer.component.css"]
})
export class HomeFilterDrawerComponent implements OnInit, OnDestroy, AfterViewInit {
  private subscriptionsArr: Subscription[] = [];

  /* general */
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public generalFiltersSelector = this.store.pipe(select(selectGeneralFilters));

  /* products */
  public productsFilterSelector = this.store.pipe(select(selectProductFilter));
  public productTypesSelector = this.store.pipe(select(selectProductTypes));
  public productTagsSelector = this.store.pipe(select(selectProductTags));

  /* business */
  public businessesFilterSelector = this.store.pipe(select(selectBusinessFilter));
  public businessesTypesSelector = this.store.pipe(select(selectBusinessTypes));
  public businessesAmenitiesSelector = this.store.pipe(select(selectBusinessAmenities));

  public businessFilters: IBFilters = null;
  public productsFilters: IPFilters = null;
  public generalFilters: IGFilters = null;

  public selectedTags;
  public selectedTypes;

  /* represents the id of the selected item in dropdown. */
  public selectedTypeID = null;

  /*
    this will help us make http call the first time user selects the products tab. After that,
    the products will only be updated when user applies a filter or search on searchbox.
  */
  public initialLoad = true;
  public productsRetrieved: boolean = false;
  public showingBusinesses: boolean = true;
  public filterTypeText: string;
  @ViewChild("location") locationElementRef: ElementRef;
  @ViewChild("searchDistance") searchDistanceControl: ElementRef;
  @ViewChild("searchDistanceSlider") searchDistanceSliderControl: ElementRef;
  @ViewChild("textDistance") searchDistanceTextDistanceControl: ElementRef;
  @ViewChild("distanceCustomHandle") searchDistanceCustomHandle: ElementRef;

  constructor(
    private store: Store<IAppState>,
    private geoLocationService: GeoLocationService,
    private filterService: FiltersService,
    private generalService: GeneralService,
    private businessService: BusinessService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.initializeSubscribers();
    this.dispatchActions();
    this.getLocationLatLon();
  }

  getLocationLatLon() {
    this.geoLocationService
      .getSearchCities(this.locationElementRef, ["(cities)"])
      .subscribe(place => {
        this.generalFilters.latlondis[0] = place.geometry.location.lat();
        this.generalFilters.latlondis[1] = place.geometry.location.lng();
        this.generalFilters.city = place.formatted_address.split(",")[0];
      });
  }

  setBusinessDrawerFilters() {
    this.selectedTags = this.businessFilters.amenities;
    this.selectedTypes = this.businessFilters.business_types;
    this.selectedTypeID = this.filterService.getSelectedTypeID(this.businessFilters.business_types);
    this.filterTypeText = "Business Type";
  }

  setProductDrawerFilters() {
    this.selectedTags = this.productsFilters.tags;
    this.selectedTypes = this.productsFilters.product_types;
    this.selectedTypeID = this.filterService.getSelectedTypeID(this.productsFilters.product_types);
    this.filterTypeText = "Product Type";
  }

  saveProductFiltersState() {
    this.productsFilters.tags = this.selectedTags;
    this.productsFilters.product_types = this.selectedTypes;
  }

  initializeSubscribers() {
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessFilters = filter;
      this.setBusinessDrawerFilters();
    });

    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filter => {
      this.generalFilters = filter;

      if (this.initialLoad) {
        this.initialLoad = !this.initialLoad;
        this.setInitialLatLon();
      }
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
          this.saveProductFiltersState();
          this.setBusinessDrawerFilters();
        } else {
          this.saveBusinessState();
          this.setProductDrawerFilters();

          if (!this.productsRetrieved) {
            this.productsRetrieved = !this.productsRetrieved;
            this.searchProducts(this.productsFilters, this.generalFilters);
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
    this.subscriptionsArr.push(generalFiltersSubscriber);
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

  ngAfterViewInit() {
    let self = this;

    jQuery(self.searchDistanceSliderControl.nativeElement).slider({
      range: "min",
      value: jQuery(self.searchDistanceControl.nativeElement).val(),
      min: 0,
      max: 100,
      slide: function(event, ui) {
        self.generalFilters.latlondis[2] = ui.value;
        jQuery(self.searchDistanceControl.nativeElement).val(ui.value);
        jQuery(self.searchDistanceTextDistanceControl.nativeElement).text(ui.value);
        jQuery(self.searchDistanceCustomHandle.nativeElement).attr("data-value", ui.value);
      },
      create: function() {}
    });
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

  dispatchActions() {
    this.businessService.getBusinessFilterData();
    this.store.dispatch(new GetProductTypes());
    this.store.dispatch(new GetProductTags());
  }

  setInitialLatLon() {
    this.geoLocationService.getPosition().subscribe((pos: any) => {
      /* if we get the user position, update the default latlon of user, otherwise call with default latlon. */
      if (pos.coords) {
        this.generalFilters.latlondis[0] = pos.coords.latitude;
        this.generalFilters.latlondis[1] = pos.coords.longitude;

        // set map center to this latlng
        this.geoLocationService
          .getCityFromLatLng(this.generalFilters.latlondis)
          .subscribe(place => {
            this.generalFilters.city = place;

            this.store.dispatch(new UpdateDefaultLatLonDis(Object.assign({}, this.generalFilters)));

            this.generalService.updateGeneralFilters(this.generalFilters);
            this.searchBusinesses(this.businessFilters, this.generalFilters);
          });
      } else {
        // set map center to default latlng
        this.searchBusinesses(this.businessFilters, this.generalFilters);
      }
    });
  }

  saveBusinessState() {
    this.businessService.saveBusinessFiltersState(this.selectedTags, this.selectedTypes);
  }

  applyFilters() {
    if (this.showingBusinesses) {
      this.saveBusinessState();
      this.searchBusinesses(this.businessFilters, this.generalFilters);
    } else {
      this.saveProductFiltersState();
      this.searchProducts(this.productsFilters, this.generalFilters);
    }
    this.generalService.updateGeneralFilters(this.generalFilters);
  }

  toggleCheckbox(idx: number) {
    this.selectedTags[idx].checked = !this.selectedTags[idx].checked;
  }
  dropDownChanged(selectedType: any) {
    let typeID = null;

    if (selectedType !== undefined) {
      typeID = selectedType.id;
    }

    this.selectedTypes = this.filterService.selectTypeInFilter(this.selectedTypes, typeID);
  }

  searchBusinesses(businessParams: any, generalParams: any) {
    this.businessService.updateBusinessFilters(businessParams);
    this.store.dispatch(
      new GetSearchBusiness({ businessParams: businessParams, generalParams: generalParams })
    );
  }
  searchProducts(productsParams: any, generalParams: any) {
    this.productService.updateProductFilters(productsParams);
    this.store.dispatch(
      new GetSearchProducts({ productParams: productsParams, generalParams: generalParams })
    );
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
