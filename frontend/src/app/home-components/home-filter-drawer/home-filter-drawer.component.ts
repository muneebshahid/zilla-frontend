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
import { selectBusinessFilter } from "src/app/store/selectors/business";

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

  public businessTags = [
    {
      id: 1,
      tag: "tag1",
      checked: false
    },
    {
      id: 2,
      tag: "tag2",
      checked: false
    },
    {
      id: 3,
      tag: "tag3",
      checked: false
    },
    {
      id: 4,
      tag: "tag4",
      checked: false
    },
    {
      id: 5,
      tag: "tag5",
      checked: false
    },
    {
      id: 6,
      tag: "tag6",
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

  cities4 = [
    { id: 1, name: "Bar" },
    { id: 2, name: "Club" },
    { id: 3, name: "Pub" },
    { id: 4, name: "Restaurant" },
    { id: 5, name: "PlayZone" }
  ];

  public selectedTags;
  public distanceControlShowing: boolean = true;
  @ViewChild("searchDistance") searchDistance: ElementRef;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
        if (this.showingBusinesses) {
          this.setTags(this.businessTags);
          this.distanceControlShowing = true;
        } else {
          this.setTags(this.productTags);
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

    this.subscriptionsArr.push(showingBusinessesSubscriber);
  }
  ngAfterViewInit() {
    this.setTags(this.businessTags);
  }

  setTags(tags: any) {
    this.selectedTags = tags;
  }

  getInitialResults() {
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
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
      this.businessFilters.amenities = this.getIdsOfSelectedTags(this.businessTags);
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
