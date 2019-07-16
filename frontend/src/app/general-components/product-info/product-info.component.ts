import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input } from "@angular/core";
import { environment } from "src/environments/environment";
import { selectProducts } from "src/app/store/selectors/product";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";

@Component({
  selector: "app-product-info",
  templateUrl: "./product-info.component.html",
  styleUrls: ["./product-info.component.css"]
})
export class ProductInfoComponent implements OnInit {
  private subscriptionsArr: Subscription[] = [];
  @Input() public businessProducts: IBusiness[];
  @Input() public homePage = false;

  public productsSelector = this.store.pipe(select(selectProducts));
  public endpoint = environment.apiEndpoint;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const businessProductsSubscriber = this.productsSelector.subscribe(businessProducts => {
      console.log(businessProducts);
      this.businessProducts = businessProducts;
    });

    this.subscriptionsArr.push(businessProductsSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
