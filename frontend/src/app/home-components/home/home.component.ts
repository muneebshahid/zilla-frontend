import { GeoLocationService } from "./../../services/geo-location/geo-location.service";
import { Component, OnInit, ViewChild } from "@angular/core";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { MapComponent } from "src/app/general-components";
import { GetSearchBusiness } from "src/app/store/actions/business";
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

  addMarkerToMap(lat, lng, zoom) {
    this.mapComponent.setPageLocation(lat, lng, zoom);
  }

  ngOnInit() {
    /* for opening the map on the initial coordinates of the current coordinates of the user */
    this.geoLocationService.getPosition().subscribe((pos: Position) => {
      this.addMarkerToMap(+pos.coords.latitude, +pos.coords.longitude, 2);
      this.store.dispatch(
        new GetSearchBusiness({
          query: "brown",
          latlon: `${pos.coords.latitude},${pos.coords.longitude}`
        })
      );
    });
  }

  updateMobileMapView() {}
}
