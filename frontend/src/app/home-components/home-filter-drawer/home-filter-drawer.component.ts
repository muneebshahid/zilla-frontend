import { IBFilters } from "./../../models/business_filters";
import { Component, OnInit, OnDestroy, AfterViewInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { UpdateBusinessFilters, GetSearchBusiness } from "src/app/store/actions/business";
import { UpdateSearchType } from "src/app/store/actions/general";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";
import { IPFilters } from "src/app/models/product_filters";

@Component({
  selector: "app-home-filter-drawer",
  templateUrl: "./home-filter-drawer.component.html",
  styleUrls: ["./home-filter-drawer.component.css"]
})
export class HomeFilterDrawerComponent implements OnInit, OnDestroy, AfterViewInit {
  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}
  private subscriptionsArr: Subscription[] = [];
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public showingBusinesses = true;

  public businessFilters: IBFilters = {
    latlondis: [10, 10, 100000],
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
      tag: "tag1"
    },
    {
      id: 2,
      tag: "tag2"
    },
    {
      id: 3,
      tag: "tag3"
    },
    {
      id: 4,
      tag: "tag4"
    },
    {
      id: 5,
      tag: "tag5"
    },
    {
      id: 6,
      tag: "tag6"
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
  public selectedTags;

  ngOnInit() {
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
        if (this.showingBusinesses) {
          this.setTags(this.businessTags);
        } else {
          this.setTags(this.productTags);
        }
      }
    );

    this.getInitialResults();

    this.subscriptionsArr.push(showingBusinessesSubscriber);
  }
  ngAfterViewInit() {
    this.setTags(this.businessTags);
  }

  setTags(tags: any) {
    console.log(tags);
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
  applyFilters() {
    if (this.showingBusinesses) {
      /* send business request  */
      // this.store.dispatch(new GetSearchBusiness());
    } else {
      // this.store.dispatch(new GetSearchProducts(params));
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
