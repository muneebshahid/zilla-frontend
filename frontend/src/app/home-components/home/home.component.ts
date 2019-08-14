import { Component, OnInit, OnDestroy, ViewChild } from "@angular/core";
import { Subscription } from "rxjs";
import { select, Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectIsLoading } from "src/app/store/selectors/general";
import { HomeListingsComponent } from "../home-listings/home-listings.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit, OnDestroy {
  mapClass = "agm-map-home";

  private subscriptionsArr: Subscription[] = [];
  public isLoadingSelector = this.store.pipe(select(selectIsLoading));

  loading = false;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    const isLoadingSubscriber = this.isLoadingSelector.subscribe(loading => {
      this.loading = loading;
    });
    this.subscriptionsArr.push(isLoadingSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
