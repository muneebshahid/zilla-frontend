import { Component, OnInit, Input, Output, EventEmitter, OnDestroy } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { select, Store } from "@ngrx/store";
import { selectProducts, selectNumHits } from "src/app/store/selectors/product";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home-listings",
  templateUrl: "./home-listings.component.html",
  styleUrls: ["./home-listings.component.css"]
})
export class HomeListingsComponent implements OnInit, OnDestroy {
  @Output() setMobileMapView = new EventEmitter<string>();
  public productSelector = this.store.pipe(select(selectProducts));
  public numHitSelector = this.store.pipe(select(selectNumHits));
  public products: IProduct[];
  private hits: number = 0;
  private subscriptionsArr: Subscription[] = [];

  constructor(private store: Store<IAppState>) {}

  baseUrl = "/api";
  searchType = "Products";

  ngOnInit() {
    const productSubscriber = this.productSelector.subscribe(products => {
      this.products = products;
    });
    const numHitSubscriber = this.numHitSelector.subscribe(num_hit => {
      this.hits = num_hit;
    });

    this.subscriptionsArr.push(productSubscriber);
    this.subscriptionsArr.push(numHitSubscriber);
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
