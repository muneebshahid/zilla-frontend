import { Component, OnInit, OnDestroy } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { selectShowingBusinesses } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";

@Component({
  selector: "app-home-filter-drawer",
  templateUrl: "./home-filter-drawer.component.html",
  styleUrls: ["./home-filter-drawer.component.css"]
})
export class HomeFilterDrawerComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}
  private subscriptionsArr: Subscription[] = [];
  public showingBusinessesSelector = this.store.pipe(select(selectShowingBusinesses));
  public showingBusinesses = true;

  ngOnInit() {
    const showingBusinessesSubscriber = this.showingBusinessesSelector.subscribe(
      showingBusinesses => {
        this.showingBusinesses = showingBusinesses;
      }
    );

    this.subscriptionsArr.push(showingBusinessesSubscriber);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
