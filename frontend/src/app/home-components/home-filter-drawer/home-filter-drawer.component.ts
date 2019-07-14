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
import { selectProductFilter } from "src/app/store/selectors/product";
import {
  selectBusinessFilter,
  selectBusinessAmenities,
  selectBusinessTypes
} from "src/app/store/selectors/business";

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

  public businessesTypesSelector = this.store.pipe(select(selectBusinessTypes));
  public businessesAmenitiesSelector = this.store.pipe(select(selectBusinessAmenities));

  public showingBusinesses = true;

  public businessFilters: IBFilters = {
    latlondis: [0, 0, 100000],
    query: "",
    amenities: [],
    business_type: ""
  };
  public productsFilters: IPFilters = {
    query: "",
    product_type: "",
    tags: [],
    latlondis: [],
    available: 0,
    price: 0
  };

  public businessAmenities = [
    {
      tag: "tag1",
      id: 1,
      checked: false
    },
    {
      tag: "tag2",
      id: 2,
      checked: false
    },
    {
      tag: "tag3",
      id: 3,
      checked: false
    },
    {
      tag: "tag4",
      id: 4,
      checked: false
    }
  ];
  public productTags = [
    {
      id: 1,
      tag: "ptag1"
    },
    {
      id: 2,
      tag: "ptag2"
    },
    {
      id: 3,
      tag: "ptag3"
    },
    {
      id: 4,
      tag: "ptag4"
    },
    {
      id: 5,
      tag: "ptag5"
    },
    {
      id: 6,
      tag: "ptag6"
    }
  ];

  public businessTypes;
  public selectedBusinessType;
  public selectedTags;
  public distanceControlShowing: boolean = true;
  @ViewChild("searchDistance") searchDistance: ElementRef;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  ngOnInit() {
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

    this.getInitialResults();

    this.productsFilterSelector.subscribe(filter => {
      this.productsFilters = filter;
    });
    this.businessesFilterSelector.subscribe(filter => {
      this.businessFilters = filter;
    });
    this.businessesAmenitiesSelector.subscribe(amenities => {
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
    this.businessesTypesSelector.subscribe(types => {
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
    this.selectedTags = this.businessAmenities;
    this.dispatchActions();
    this.subscriptionsArr.push(showingBusinessesSubscriber);
  }
  ngAfterViewInit() {}

  dispatchActions() {
    this.store.dispatch(new GetBusinessAmenities());
    this.store.dispatch(new GetBusinessTypes());
  }

  getInitialResults() {
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.businessFilters.latlondis[0] = pos.coords.latitude;
      this.businessFilters.latlondis[1] = pos.coords.longitude;
      this.searchBusinesses({
        latlondis: `${pos.coords.latitude},${pos.coords.longitude},${
          this.businessFilters.latlondis[2]
        }`
      });
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
      this.businessFilters.amenities = this.getIdsOfSelectedTags(this.businessAmenities);
      this.businessFilters.business_type = this.selectedBusinessType;

      console.log(this.businessAmenities);
      console.log(this.businessFilters);
      // this.store.dispatch(new GetSearchBusiness(this.businessFilters));
    } else {
      // this.store.dispatch(new GetSearchProducts(this.productsFilters));
    }
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
