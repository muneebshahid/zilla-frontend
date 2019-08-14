import { ActivatedRoute } from "@angular/router";
import { UpdateCloseDetailDrawer } from "./../../store/actions/general";
import { selectCloseDetailDrawer } from "./../../store/selectors/general";
import {
  Component,
  OnInit,
  ViewContainerRef,
  ViewChild,
  ComponentFactoryResolver,
  OnDestroy,
  EventEmitter,
  Output
} from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { Subscription } from "rxjs";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { selectBusiness } from "src/app/store/selectors/business";
import { HomeDetailDrawerComponent } from "../home-detail-drawer/home-detail-drawer.component";
import { LocationService } from "src/app/services/location/location.service";
import { BusinessService } from "src/app/services/business/business.service";

@Component({
  selector: "app-home-drawers-container",
  templateUrl: "./home-drawers-container.component.html",
  styleUrls: ["./home-drawers-container.component.css"]
})
export class HomeDrawersContainerComponent implements OnInit, OnDestroy {
  @Output() public setLatLonDis = new EventEmitter<Array<number>>();
  @Output() public putTemporaryMarkerOnMap = new EventEmitter<IBusiness>();
  @Output() public removeTemporaryMarkerOnMap = new EventEmitter<IBusiness>();
  constructor(
    private store: Store<IAppState>,
    private resolver: ComponentFactoryResolver,
    private location: LocationService,
    private businessService: BusinessService
  ) {}
  public businessSelector = this.store.pipe(select(selectBusiness));
  public closeDrawerSelector = this.store.pipe(select(selectCloseDetailDrawer));
  public subscriptionsArr: Subscription[] = [];
  public business: IBusiness;

  componentRef: any;
  @ViewChild("homeDetailDrawer", { read: ViewContainerRef }) entry: ViewContainerRef;

  ngOnInit() {
    this.subscriptions();
  }
  private subscriptions() {
    const subcriberBusiness = this.businessSelector.subscribe(business => {
      if (business !== null && business !== undefined) {
        if (this.businessService.getPendingDetailID() !== null) {
          if (
            !this.businessService.checkBusinessShownByID(this.businessService.getPendingDetailID())
          ) {
            this.putTemporaryMarkerOnMap.emit(business);
          }
        }

        this.business = business;
        this.setLatLonDis.emit(business.business.latlon);
        this.createComponent(business);
      }
    });
    const closeDrawerSubcriber = this.closeDrawerSelector.subscribe(close => {
      if (close) {
        if (this.businessService.getPendingDetailID() !== null) {
          this.businessService.setPendingDetailID(null);
          this.removeTemporaryMarkerOnMap.emit();
        }
        this.location.clearLocation();
        this.destroyComponent();
      }
    });

    this.subscriptionsArr.push(subcriberBusiness);
    this.subscriptionsArr.push(closeDrawerSubcriber);
  }
  createComponent(business) {
    this.entry.clear();
    const factory = this.resolver.resolveComponentFactory(HomeDetailDrawerComponent);
    this.componentRef = this.entry.createComponent(factory);
    this.componentRef.instance.business = business;
    this.componentRef.instance.isActive = true;
    this.store.dispatch(new UpdateCloseDetailDrawer(false));
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
  destroyComponent() {
    this.componentRef.destroy();
  }
}
