import { Component, OnInit } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { ActivatedRoute } from "@angular/router";
import { selectBusiness } from "src/app/store/selectors/business";
import { GetBusinessDetail } from "src/app/store/actions/business";

@Component({
  selector: "app-home-detail-drawer",
  templateUrl: "./home-detail-drawer.component.html",
  styleUrls: ["./home-detail-drawer.component.css"]
})
export class HomeDetailDrawerComponent implements OnInit {
  images = [
    {
      file: "/media/product/1/55549b43-c877-407f-81e6-137e20949885.jpg"
    },
    {
      file: "/media/product/1/55549b43-c877-407f-81e6-137e20949885.jpg"
    },
    {
      file: "/media/product/1/55549b43-c877-407f-81e6-137e20949885.jpg"
    },
    {
      file: "/media/product/1/55549b43-c877-407f-81e6-137e20949885.jpg"
    },
    {
      file: "/media/product/1/55549b43-c877-407f-81e6-137e20949885.jpg"
    }
  ];

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}
  private businessSelector = this.store.pipe(select(selectBusiness));
  private subscriptionsArr: Subscription[] = [];
  public business: IBusiness;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new GetBusinessDetail({ slug: "williams-ltd", id: 1 }));
    });
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
