import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { GetNearbyProducts } from "src/app/store/actions/product";
import { IAppState } from "src/app/store/state/app.state";
import { selectProduct } from "../../store/selectors/product";
import { IProduct } from "src/app/models/product";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapClass = "agm-map-home";
  productSelector = this.store.pipe(select(selectProduct));
  products: IProduct[];
  loading = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetNearbyProducts({ lat: 20, lng: 20 }));
    this.productSelector.subscribe(products => {
      this.products = products;
      console.log(products);
    });
  }
}
