import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from "@angular/core";

import { Marker } from "../../models/marker";
import { Location } from "../../models/location";
import { MapsAPILoader, AgmMap } from "@agm/core";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { selectMarkerHighlighting, selectGeneralFilters } from "src/app/store/selectors/general";
import { Subscription } from "rxjs";
import { BusinessService } from "src/app/services/business/business.service";

declare var google: any;

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @Input() mapClass;
  @Output() openDrawer = new EventEmitter<number>();
  public detailViewZoom = 8;
  public subscriptionsArr: Subscription[] = [];

  public markerHighlightingSelector = this.store.pipe(select(selectMarkerHighlighting));
  public generalFilterSelector = this.store.pipe(select(selectGeneralFilters));

  public initialMapLocationLat = 48.17669;
  public initialMapLocationLng = 11.5726359;
  public initialZoom = 1;

  public normalMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000";
  public highlightedMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4";
  public location: Location;
  public markers: Array<Marker> = [];

  @ViewChild(AgmMap) map: AgmMap;

  public lastLatLonDis = [1, 2, 3];

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private store: Store<IAppState>,
    private businessService: BusinessService
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {});
  }
  ngOnInit() {
    this.initializeMarkersAndMapZoom();

    const generalFilterSubscriber = this.generalFilterSelector.subscribe(latlondis => {
      if (
        latlondis.latlondis[0] !== this.lastLatLonDis[0] ||
        latlondis.latlondis[1] !== this.lastLatLonDis[1]
      ) {
        this.setFocusLocation(latlondis.latlondis[0], latlondis.latlondis[1]);
        this.lastLatLonDis = Object.assign({}, latlondis.latlondis);
      }
    });

    const markerHighlightingSubscriber = this.markerHighlightingSelector.subscribe(data => {
      this.highlightMarkerByID(data);
    });

    this.subscriptionsArr.push(markerHighlightingSubscriber);
    this.subscriptionsArr.push(generalFilterSubscriber);
  }

  openDetailDrawer(marker) {
    this.setFocusLocation(marker.lat, marker.lng, this.detailViewZoom);
    this.businessService.dispatchGetBusinessDetail(marker.id);
  }

  /* Highlights the marker which is being hovered in the left side on the grid */
  public highlightMarkerByID(obj: any) {
    for (const marker of this.markers) {
      if (marker.id === obj.markerID && obj.highlighted === true) {
        marker.icon = this.highlightedMarkerIcon;
      } else {
        marker.icon = this.normalMarkerIcon;
      }
    }
  }
  /* Highlights the marker which is being hovered */
  public highlightMarkeronHover(idx: any) {
    if (this.markers[idx].highlighted) {
      this.markers[idx].icon = this.normalMarkerIcon;
    } else {
      this.markers[idx].icon = this.highlightedMarkerIcon;
    }
    this.markers[idx].highlighted = !this.markers[idx].highlighted;
  }

  setFocusLocation(lat, lng, zoom = 12) {
    this.location = {
      lng: +lng,
      lat: +lat,
      zoom: zoom
    };
  }

  initializeMarkersAndMapZoom() {
    this.setFocusLocation(this.initialMapLocationLat, this.initialMapLocationLng, this.initialZoom);
  }

  public createMarker(lat, lng, id, icon) {
    return {
      lat: lat,
      lng: lng,
      draggable: false,
      highlighted: false,
      id: id,
      icon: icon
    };
  }
  ngOnDestroy() {
    for (const subscriber of this.subscriptionsArr) {
      subscriber.unsubscribe();
    }
  }
}
