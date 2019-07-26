import { Component, OnInit, OnDestroy, AfterViewInit, ViewChild, ElementRef } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses, selectGeneralFilters } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
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
import { FiltersService } from "src/app/services/filters/filters.service";
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

  public selectedTags;
  public selectedTypes;

  /* represents the id of the selected item in dropdown. */
  public selectedTypeID = null;

  /*
    this will help us make http call the first time user selects the products tab. After that,
    the products will only be updated when user applies a filter or search on searchbox.
  */
  public defaultLocationLoaded = false;
  public productsRetrieved: boolean = false;
  public filterTypeText: string;

  @ViewChild("location") locationElementRef: ElementRef;

  @ViewChild("searchDistance") searchDistanceControl: ElementRef;
  @ViewChild("searchDistanceSlider") searchDistanceSliderControl: ElementRef;
  @ViewChild("textDistance") searchDistanceTextDistanceControl: ElementRef;
  @ViewChild("distanceCustomHandle") searchDistanceCustomHandle: ElementRef;

  @ViewChild("searchPrice") searchPriceControl: ElementRef;
  @ViewChild("searchPriceSlider") searchPriceSliderControl: ElementRef;
  @ViewChild("textPrice") searchPriceTextPriceControl: ElementRef;
  @ViewChild("priceCustomHandle") searchPriceCustomHandle: ElementRef;

  constructor(
    private store: Store<IAppState>,
    private geoLocationService: GeoLocationService,
    private filterService: FiltersService,
    private generalService: GeneralService,
    private businessService: BusinessService,
    private productService: ProductService
  ) {}

  ngOnInit() {
    this.businessService.getBusinessFilterData();
    this.productService.getProductFilterData();

    this.initializeSubscribers();
    this.getLocationLatLon();
  }

  getLocationLatLon() {
    this.geoLocationService
      .getSearchCities(this.locationElementRef, ["(cities)"])
      .subscribe(place => {
        this.generalService.setGeneralFiltersLatLon(
          place.geometry.location.lat(),
          place.geometry.location.lng()
        );

        this.generalService.setGeneralFiltersCity(place.formatted_address.split(",")[0]);
      });
  }

  setBusinessDrawerFilters() {
    this.selectedTags = this.businessService.getBusinessFilterAmenities();
    this.selectedTypes = this.businessService.getBusinessFilterTypes();
    this.selectedTypeID = this.filterService.getSelectedTypeID(
      this.businessService.getBusinessFilterTypes()
    );
    this.filterTypeText = "Business Type";
  }

  setProductDrawerFilters() {
    this.selectedTags = this.productService.getProductFilterTags();
    this.selectedTypes = this.productService.getProductFilterTypes();
    this.selectedTypeID = this.filterService.getSelectedTypeID(
      this.productService.getProductFilterTypes()
    );
    this.filterTypeText = "Product Type";
  }

  saveProductFiltersState() {
    this.productService.setProductFilterTags(this.selectedTags);
    this.productService.setProductFilterTypes(this.selectedTypes);
    // price value already being set by the jquery code as soon as user changes the slider.
  }

  initializeSubscribers() {
    const businessFilterSubscriber = this.businessesFilterSelector.subscribe(filter => {
      this.businessService.setBusinessFilter(filter);

      this.setBusinessDrawerFilters();
    });

    const generalFiltersSubscriber = this.generalFiltersSelector.subscribe(filter => {
      this.generalService.setGeneralFilters(filter);

      if (!this.defaultLocationLoaded) {
        this.defaultLocationLoaded = !this.defaultLocationLoaded;
        this.setInitialLatLon();
      }
    });

    const productsFilterSubscriber = this.productsFilterSelector.subscribe(filter => {
      this.productService.setProductFilters(filter);
      this.setProductDrawerFilters();
    });
    /* this subscribe will be called whenever we switch tabs b/w business and products */
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.generalService.setShowBusinesses(showingBusinesses);
        if (this.generalService.getShowBusinesses()) {
          this.saveProductFiltersState();
          this.setBusinessDrawerFilters();
        } else {
          this.saveBusinessState();
          this.setProductDrawerFilters();

          if (!this.productsRetrieved) {
            this.productsRetrieved = !this.productsRetrieved;
            this.searchProducts(
              this.productService.getProductFilters(),
              this.generalService.getGeneralFilters()
            );
          }
          this.productsLoadedFirstTime();
        }
      }
    );

    const businessAmenitiesSubscriber = this.businessesAmenitiesSelector.subscribe(amenities => {
      this.businessService.setBusinessFilterAmenities(this.getCheckboxVersionOfFilters(amenities));
      this.selectedTags = this.businessService.getBusinessFilterAmenities();
    });
    const businessTypesSubscriber = this.businessesTypesSelector.subscribe(businessTypes => {
      this.businessService.setBusinessFilterTypes(this.getDropDownVersionOfFilters(businessTypes));
      this.selectedTypes = this.businessService.getBusinessFilterTypes();
    });

    const productTypesSubscriber = this.productTypesSelector.subscribe(productTypes => {
      this.productService.setProductFilterTypes(this.getDropDownVersionOfFilters(productTypes));
    });
    const productTagsSubscriber = this.productTagsSelector.subscribe(productTags => {
      this.productService.setProductFilterTags(this.getCheckboxVersionOfFilters(productTags));
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

  productsLoadedFirstTime() {
    let self = this;

    setTimeout(() => {
      jQuery(self.searchPriceSliderControl.nativeElement).slider({
        range: "min",
        value: jQuery(self.searchPriceControl.nativeElement).val(),
        min: 0,
        max: 100,
        slide: function(event, ui) {
          self.productService.setProductFilterPrice(ui.value);
          jQuery(self.searchPriceControl.nativeElement).val(ui.value);
          jQuery(self.searchPriceTextPriceControl.nativeElement).text(ui.value);
          jQuery(self.searchPriceCustomHandle.nativeElement).attr("data-value", ui.value);
        },
        create: function() {}
      });
    });
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
        self.generalService.setGeneralFiltersRadius(ui.value);
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

  setInitialLatLon() {
    this.geoLocationService.getPosition().subscribe((pos: any) => {
      /* if we get the user position, update the default latlon of user, otherwise call with default latlon. */
      if (pos.coords) {
        this.generalService.setGeneralFiltersLatLon(pos.coords.latitude, pos.coords.longitude);
        // set map center to this latlng
        this.geoLocationService
          .getCityFromLatLng(this.generalService.getGeneralFiltersLatLonDis())
          .subscribe(place => {
            this.generalService.setGeneralFiltersCity(place);

            this.generalService.updateDefaultLatLonDis();
            this.generalService.updateGeneralFilters();
            this.searchBusinesses(
              this.businessService.getBusinessFilter(),
              this.generalService.getGeneralFilters()
            );
          });
      } else {
        // set map center to default latlng
        // although no changes to generalFilter but we call this to ensure we unsubscribe from defaultLatLonsubscriber in generalService.
        this.generalService.updateDefaultLatLonDis();
        this.searchBusinesses(
          this.businessService.getBusinessFilter(),
          this.generalService.getGeneralFilters()
        );
      }
    });
  }

  saveBusinessState() {
    this.businessService.setBusinessFilterAmenities(this.selectedTags);
    this.businessService.setBusinessFilterTypes(this.selectedTypes);
  }

  applyFilters() {
    if (this.generalService.getShowBusinesses()) {
      if (this.businessService.filterChanged() || this.generalService.filterChanged()) {
        this.saveBusinessState();

        this.searchBusinesses(
          this.businessService.getBusinessFilter(),
          this.generalService.getGeneralFilters()
        );
      }
    } else {
      if (this.productService.filterChanged() || this.generalService.filterChanged()) {
        this.saveProductFiltersState();
        this.searchProducts(
          this.productService.getProductFilters(),
          this.generalService.getGeneralFilters()
        );
      }
    }
    this.generalService.updateGeneralFilters();
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
    this.businessService.setBusinessFilter(businessParams);
    this.businessService.updateBusinessFilters();
    this.businessService.dispatchSearchBusinesses(generalParams);
  }
  searchProducts(productsParams: any, generalParams: any) {
    this.productService.setProductFilters(productsParams);

    this.productService.updateProductFilters();
    this.productService.dispatchSearchProducts(generalParams);
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
