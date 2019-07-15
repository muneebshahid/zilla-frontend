import { Component, OnInit, Input } from "@angular/core";
import { IProduct } from "src/app/models/product";
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
  @Input() public products: IProduct[];
  @Input() public homePage = false;
  private subscriptionsArr: Subscription[] = [];

  public productsSelector = this.store.pipe(select(selectProducts));
  public endpoint = environment.apiEndpoint;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const productsSubscriber = this.productsSelector.subscribe(products => {
      this.products = products;
    });

    this.subscriptionsArr.push(productsSubscriber);
  }
}
