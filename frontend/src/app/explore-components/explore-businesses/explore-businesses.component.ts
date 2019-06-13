import { environment } from "./../../../environments/environment";
import { IBusiness } from "src/app/models/business";
import { Component, OnInit, OnDestroy, Output, EventEmitter } from "@angular/core";
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

  /* prevents user to reload already loaded products on multiple clicks */
  public lastSelectedIndex: number = 0;
  public businessSelectionActive: Array<boolean>;

  private businessSelector = this.store.pipe(select(selectBusinesses));
  private subscriptionsArr: Subscription[] = [];

  @Output() enableProductLoadingSign = new EventEmitter<string>();

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
          this.businessSelectionActive = new Array(this.businesses.length).fill(false);
          this.businessSelectionActive[0] = true;
        }
      });

    this.subscriptionsArr.push(subcriberBusiness);
  }

  public businessSelected(index) {
    if (index !== this.lastSelectedIndex) {
      this.store.dispatch(new GetProductsOfBusiness(this.businesses[index].user));
      this.enableProductLoadingSign.next();

      this.businessSelectionActive[this.lastSelectedIndex] = false;
      this.businessSelectionActive[index] = true;
    }
    this.lastSelectedIndex = index;
  }

  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
