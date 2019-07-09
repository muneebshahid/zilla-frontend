import { Component, Input, ViewChild, NgZone, OnInit } from "@angular/core";

import { MapsAPILoader, AgmMap, AgmMarker } from "@agm/core";
import { GoogleMapsAPIWrapper } from "@agm/core/services";

declare var google: any;

interface Marker {
  lat: number;
  lng: number;
  label?: string;
  icon?: string;
  highlighted?: boolean;
  draggable: boolean;
  slug: string;
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
  private initialMapLocationLat = 48.17669;
  private initialMapLocationLng = 11.5726359;
  private zoom = 8;

  geocoder: any;
  location: Location;
  markers: Array<Marker> = [];
  showFiller = false;

  @ViewChild(AgmMap) map: AgmMap;

  constructor(
    public mapsApiLoader: MapsAPILoader,
    private zone: NgZone,
    private wrapper: GoogleMapsAPIWrapper
  ) {
    this.mapsApiLoader = mapsApiLoader;
    this.zone = zone;
    this.wrapper = wrapper;
    this.mapsApiLoader.load().then(() => {});
  }
  ngOnInit() {
    this.initializeMarkersAndMapZoom();
  }

  openDetailDrawer() {}

  /* is called from the detail page to set the pin on the location of the product or business */
  setPageLocation(lat, lng, zoom = 8) {
    this.markers.push(this.createMarker(lat, lng));
    this.setFocusLocation(lat, lng, zoom);
  }
  public highlightMarkerByID(obj: any) {
    console.log("highlight marker function called");
    console.log(obj);
  }
  public highlightMarkerByIndex(idx: any) {
    if (this.markers[idx].highlighted) {
      this.markers[idx].icon =
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000";
    } else {
      this.markers[idx].icon =
        "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4";
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
    // dummy markers
    this.markers.push(this.createMarker(48.1548894, 11.0716248));
    // this.markers.push(this.createMarker(48.2548894, 11.0716248));
    // this.markers.push(this.createMarker(48.3548894, 11.0716248));
    // this.markers.push(this.createMarker(48.4548894, 11.0716248));
    this.setFocusLocation(this.initialMapLocationLat, this.initialMapLocationLng, this.zoom);
  }
  tabClick(e) {
    console.log(e);
  }

  createMarker(lat, lng) {
    return {
      lat: lat,
      lng: lng,
      draggable: false,
      highlighted: false,
      slug: "",
      id: -1,
      icon: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000"
      // icon: "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4"
    };
  }
}
