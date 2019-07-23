import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from "@angular/core";

import { MapsAPILoader, AgmMap } from "@agm/core";
import { IAppState } from "src/app/store/state/app.state";
import { Store, select } from "@ngrx/store";
import { selectMarkerHighlighting, selectGeneralFilters } from "src/app/store/selectors/general";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { Subscription } from "rxjs";
import { IGFilters } from "src/app/models/general_filters";

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  icon?: string;
  highlighted?: boolean;
  draggable: boolean;
  id: number;
}

interface Location {
  lat: number;
  lng: number;
  zoom: number;
}

@Component({
  selector: "app-map",
  templateUrl: "./map.component.html",
  styleUrls: ["./map.component.css"]
})
export class MapComponent implements OnInit {
  @Input() mapClass;
  @Output() openDrawer = new EventEmitter<number>();
  private subscriptionsArr: Subscription[] = [];

  public markerHighlightingSelector = this.store.pipe(select(selectMarkerHighlighting));
  public generalFilterSelector = this.store.pipe(select(selectGeneralFilters));

  private initialMapLocationLat = 48.17669;
  private initialMapLocationLng = 11.5726359;
  private initialZoom = 1;

  public normalMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000";
  public highlightedMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4";
  public location: Location;
  public markers: Array<Marker> = [];

  @ViewChild(AgmMap) map: AgmMap;

  private lastLatLonDis = [1, 2, 3];

  constructor(public mapsApiLoader: MapsAPILoader, private store: Store<IAppState>) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {});
  }
  ngOnInit() {
    this.initializeMarkersAndMapZoom();

    const generalFilterSubscriber = this.generalFilterSelector.subscribe(latlondis => {
      if (
        latlondis.latlondis[0] !== this.lastLatLonDis[0] ||
        latlondis.latlondis[1] !== this.lastLatLonDis[1] ||
        latlondis.latlondis[2] !== this.lastLatLonDis[2]
      ) {
        this.setFocusLocation(
          latlondis.latlondis[0],
          latlondis.latlondis[1],
          latlondis.latlondis[2] * -1
        );
        this.lastLatLonDis = latlondis.latlondis;
      }
    });

    const markerHighlightingSubscriber = this.markerHighlightingSelector.subscribe(data => {
      this.highlightMarkerByID(data);
    });

    this.subscriptionsArr.push(markerHighlightingSubscriber);
    this.subscriptionsArr.push(generalFilterSubscriber);
  }

  openDetailDrawer(marker) {
    this.store.dispatch(new GetBusinessDetail({ id: marker.id }));
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

  setFocusLocation(lat, lng, zoom) {
    this.location = {
      lng: +lng,
      lat: +lat,
      zoom: zoom
    };
  }

  initializeMarkersAndMapZoom() {
    this.setFocusLocation(this.initialMapLocationLat, this.initialMapLocationLng, this.initialZoom);
  }

  createMarker(lat, lng, id, icon) {
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
