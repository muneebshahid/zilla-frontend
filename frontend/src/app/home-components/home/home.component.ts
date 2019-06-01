import { Component, OnInit } from "@angular/core";
import { Store } from "@ngrx/store";
import { GetNearbyProducts } from "src/app/store/actions/product";
import { IAppState } from "src/app/store/state/app.state";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapClass = "agm-map-home";

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetNearbyProducts({ lat: 20, lng: 20 }));
  }
}
