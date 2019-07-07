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
      file: "/media/product/443/b7eaa83b-ffb8-4fd2-aef9-4856927aca00.jpg"
    },
    {
      file: "/media/product/443/b7eaa83b-ffb8-4fd2-aef9-4856927aca00.jpg"
    },
    {
      file: "/media/product/443/b7eaa83b-ffb8-4fd2-aef9-4856927aca00.jpg"
    },
    {
      file: "/media/product/443/b7eaa83b-ffb8-4fd2-aef9-4856927aca00.jpg"
    },
    {
      file: "/media/product/443/b7eaa83b-ffb8-4fd2-aef9-4856927aca00.jpg"
    }
  ];

  constructor(private store: Store<IAppState>, private route: ActivatedRoute) {}
  private businessSelector = this.store.pipe(select(selectBusiness));
  private subscriptionsArr: Subscription[] = [];
  public business: IBusiness;

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.store.dispatch(new GetBusinessDetail({ slug: "brown-nelson-and-ochoa", id: 31 }));
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
