import {
  Component,
  OnInit,
  AfterViewInit,
  HostListener,
  ViewChild,
  ElementRef
} from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { Subscription } from "rxjs";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { ActivatedRoute } from "@angular/router";
import { selectBusiness } from "src/app/store/selectors/business";
declare var apusCore: any;
declare var jQuery: any;

@Component({
  selector: "app-home-detail-drawer",
  templateUrl: "./home-detail-drawer.component.html",
  styleUrls: ["./home-detail-drawer.component.css"]
})
export class HomeDetailDrawerComponent implements OnInit {
  constructor(private store: Store<IAppState>) {}
  private businessSelector = this.store.pipe(select(selectBusiness));
  private subscriptionsArr: Subscription[] = [];
  public business: IBusiness;
  public isActive: boolean = false;

  images = [
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" },
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" },
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" },
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" },
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" },
    { file: "/media/business/3/6eaa5b88-5487-4979-a9aa-572f4f6fd1ff.jpg" }
  ];

  ngOnInit() {
    this.subscriptions();
  }
  private subscriptions() {
    const subcriberBusiness = this.businessSelector.subscribe(business => {
      if (business !== null && business !== undefined) {
        this.business = business;
        this.isActive = true;
      } else {
        // apusCore(jQuery, 2);
      }
    });

    this.subscriptionsArr.push(subcriberBusiness);
  }

  @HostListener("document:click")
  clickout() {
    this.isActive = false;
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
