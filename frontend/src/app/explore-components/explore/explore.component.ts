import { IProduct } from "./../../models/product";
import { GetExploreBusiness } from "./../../store/actions/business";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { IBusiness } from "src/app/models/business";
import { selectBusinesses } from "../../store/selectors/business";
import { selectProduct } from "../../store/selectors/product";
import { GetProductsOfBusiness } from "src/app/store/actions/product";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.css"]
})
export class ExploreComponent implements OnInit, OnDestroy {
  /* To disable to search bar appears in the mapView menu for mobile screens */
  searchBarEnabled = false;

  businessSelector = this.store.pipe(select(selectBusinesses));
  productsSelector = this.store.pipe(select(selectProduct));
  private subscriptionsArr: Subscription[] = [];

  businesses: IBusiness[] = null;
  products: IProduct[] = null;
  loading = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetExploreBusiness({ lat: 20, lng: 20 }));
    this.subscriptions();
  }

  private subscriptions() {
    const subcriberBusiness = this.businessSelector
      .pipe(
        tap(business => {
          if (business !== null) {
            this.store.dispatch(new GetProductsOfBusiness(business[0].user));
          }
        })
      )
      .subscribe(businesses => {
        this.businesses = businesses;
      });

    const subcriberProduct = this.productsSelector.subscribe(products => {
      this.products = products;
    });

    this.subscriptionsArr.push(subcriberBusiness);
    this.subscriptionsArr.push(subcriberProduct);
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
