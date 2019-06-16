import { IProduct } from "src/app/models/product";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { select, Store } from "@ngrx/store";
import { Subscription } from "rxjs";
import { selectProduct } from "src/app/store/selectors/product";
import { IAppState } from "src/app/store/state/app.state";
import { GetProductDetails } from "src/app/store/actions/product";

@Component({
  selector: "app-product-detail",
  templateUrl: "./product-detail.component.html",
  styleUrls: ["./product-detail.component.css"]
})
export class ProductDetailComponent implements OnInit, OnDestroy {
  product: IProduct;
  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}
  private productSelector = this.store.pipe(select(selectProduct));
  private subscriptionsArr: Subscription[] = [];

  ngOnInit() {
    // this.route.paramMap.subscribe(params => {
    //   // this.store.dispatch(new GetProductDetails({ slug: "frites", id: 1 }));
    //   console.log("chikna");
    //   console.log(params.get("business_slug"));
    //   console.log(params.get("product_id"));
    //   console.log(params.get("product_slug"));
    // });
    this.store.dispatch(new GetProductDetails({ slug: "frites", id: 1 }));
    this.subscriptions();
  }

  private subscriptions() {
    const subcriberBusiness = this.productSelector.subscribe(product => {
      this.product = product;
    });

    this.subscriptionsArr.push(subcriberBusiness);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
