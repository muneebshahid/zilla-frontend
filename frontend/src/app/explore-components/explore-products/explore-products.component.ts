import { Component, OnInit, OnDestroy } from "@angular/core";
import { IProduct } from "src/app/models/product";
import { environment } from "src/environments/environment";
import { selectProduct } from "../../store/selectors/product";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";

@Component({
  selector: "app-explore-products",
  templateUrl: "./explore-products.component.html",
  styleUrls: ["./explore-products.component.css"]
})
export class ExploreProductsComponent implements OnInit, OnDestroy {
  public productsLoading = true;
  public endpoint = environment.apiEndpoint;

  private productsSelector = this.store.pipe(select(selectProduct));

  public products: IProduct[];
  private subscriptionsArr: Subscription[] = [];

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.subscriptions();
  }
  subscriptions() {
    const subcriberProduct = this.productsSelector.subscribe(products => {
      this.products = products;

      if (this.products !== null) {
        this.toggleLoadingSign(false);
      }
    });
    this.subscriptionsArr.push(subcriberProduct);
  }
  toggleLoadingSign(toggleOption: boolean) {
    this.productsLoading = toggleOption;
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
