import { GeoLocationService } from "./../../services/geo-location/geo-location.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Store, select } from "@ngrx/store";
import { GetNearbyProducts } from "src/app/store/actions/product";
import { IAppState } from "src/app/store/state/app.state";
import { selectProducts } from "../../store/selectors/product";
import { IProduct } from "src/app/models/product";
import { MapComponent } from "src/app/general-components";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapClass = "agm-map-home";
  @ViewChild("mapParent") mapComponent: MapComponent;
  productSelector = this.store.pipe(select(selectProducts));
  products: IProduct[];
  loading = false;

  coordinates: any;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    this.store.dispatch(new GetNearbyProducts({ lat: 20, lng: 20 }));
    this.productSelector.subscribe(products => {
      this.products = products;
    });

    /* for opening the map on the initial coordinates of the current coordinates of the user */
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.mapComponent.setPageLocation(+pos.coords.latitude, +pos.coords.longitude, 12);
    });
  }

  updateMobileMapView() {}
}
