import { Component, OnInit, OnDestroy } from "@angular/core";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { selectBusiness } from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";

@Component({
  selector: "app-business-detail",
  templateUrl: "./business-detail.component.html",
  styleUrls: ["./business-detail.component.css"]
})
export class BusinessDetailComponent implements OnInit, OnDestroy {
  constructor(private store: Store<IAppState>) {}
  private businessSelector = this.store.pipe(select(selectBusiness));
  private subscriptionsArr: Subscription[] = [];
  public business: IBusiness;

  ngOnInit() {
    this.store.dispatch(new GetBusinessDetail({ slug: "lee-hull-and-brown", id: 174 }));
    this.subscriptions();
  }
  private subscriptions() {
    const subcriberBusiness = this.businessSelector.subscribe(business => {
      this.business = business;
    });

    this.subscriptionsArr.push(subcriberBusiness);
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
