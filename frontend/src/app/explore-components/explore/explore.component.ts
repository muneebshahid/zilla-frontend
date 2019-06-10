import { GetExploreBusiness } from "./../../store/actions/business";
import { Component, OnInit } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { IBusiness } from "src/app/models/business";
import { selectBusinesses } from "../../store/selectors/business";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.css"]
})
export class ExploreComponent implements OnInit {
  /* To disable to search bar appears in the mapView menu for mobile screens */
  searchBarEnabled = false;

  businessSelector = this.store.pipe(select(selectBusinesses));
  businesses: IBusiness[];
  loading = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetExploreBusiness({ lat: 20, lng: 20 }));

    this.businessSelector.subscribe(businesses => {
      this.businesses = businesses;
    });
  }
}
