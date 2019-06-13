import { environment } from "./../../../environments/environment";
import { IBusiness } from "src/app/models/business";
import { Component, OnInit, OnDestroy } from "@angular/core";
import { selectBusinesses } from "../../store/selectors/business";
import { GetProductsOfBusiness } from "src/app/store/actions/product";
import { Subscription } from "rxjs";
import { tap } from "rxjs/operators";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { GetExploreBusiness } from "./../../store/actions/business";

@Component({
  selector: "app-explore-businesses",
  templateUrl: "./explore-businesses.component.html",
  styleUrls: ["./explore-businesses.component.css"]
})
export class ExploreBusinessesComponent implements OnInit, OnDestroy {
  public endpoint = environment.apiEndpoint;
  public businesses: IBusiness[];
  public businessLoading: boolean = true;

  private businessSelector = this.store.pipe(select(selectBusinesses));
  private subscriptionsArr: Subscription[] = [];

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {
    this.store.dispatch(new GetExploreBusiness({ lat: 20, lng: 20 }));
    this.subscriptions();
  }

  private subscriptions() {
    const subcriberBusiness = this.businessSelector
      .pipe(
        tap(business => {
          if (business !== null) {
            this.store.dispatch(new GetProductsOfBusiness(business[0].user));
          }
        })
      )
      .subscribe(businesses => {
        this.businesses = businesses;

        if (businesses !== null) {
          this.businessLoading = false;
        }
      });

    this.subscriptionsArr.push(subcriberBusiness);
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
