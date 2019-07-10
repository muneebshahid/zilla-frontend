import { Component, Input, ViewChild, OnInit, EventEmitter, Output } from "@angular/core";

import { MapsAPILoader, AgmMap } from "@agm/core";

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
  @Output() openDrawer = new EventEmitter<number>();
  private initialMapLocationLat = 48.17669;
  private initialMapLocationLng = 11.5726359;
  private initialZoom = 8;

  public normalMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|FF0000";
  public highlightedMarkerIcon =
    "https://chart.apis.google.com/chart?chst=d_map_pin_letter&chld=%E2%80%A2|4286f4";
  public location: Location;
  public markers: Array<Marker> = [];

  @ViewChild(AgmMap) map: AgmMap;

  constructor(public mapsApiLoader: MapsAPILoader) {
    this.mapsApiLoader = mapsApiLoader;
    this.mapsApiLoader.load().then(() => {});
  }
  ngOnInit() {
    this.initializeMarkersAndMapZoom();
  }

  openDetailDrawer(marker) {
    this.openDrawer.next(marker);
  }

  setPageLocation(lat, lng, zoom = 8) {
    this.setFocusLocation(lat, lng, zoom);
  }

  /* Highlights the marker which is being hovered in the left side on the grid */
  public highlightMarkerByID(obj: any) {
    for (const marker of this.markers) {
      if (marker.id === obj.id && obj.highlight === true) {
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

  createMarker(lat, lng, slug, id, icon) {
    return {
      lat: lat,
      lng: lng,
      draggable: false,
      highlighted: false,
      slug: slug,
      id: id,
      icon: icon
    };
  }
}
