import { GetSearchProducts } from "./../../store/actions/product";
import { GeoLocationService } from "./../../services/geo-location/geo-location.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { MapComponent } from "src/app/general-components";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapClass = "agm-map-home";
  @ViewChild("mapParent") mapComponent: MapComponent;

  loading = false;

  coordinates: any;

  constructor(private store: Store<IAppState>, private geoLocationService: GeoLocationService) {}

  ngOnInit() {
    /* for opening the map on the initial coordinates of the current coordinates of the user */
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.mapComponent.setPageLocation(+pos.coords.latitude, +pos.coords.longitude, 12);
      this.store.dispatch(
        new GetSearchProducts({
          query: "burger",
          latlon: `${pos.coords.latitude},${pos.coords.longitude}`
        })
      );
    });
  }

  updateMobileMapView() {}
}
