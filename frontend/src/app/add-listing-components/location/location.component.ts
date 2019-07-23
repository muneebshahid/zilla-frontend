import { Component, OnInit, ViewChild, ElementRef, NgZone } from "@angular/core";
import { FormControl } from "@angular/forms";
import {} from "googlemaps";
import { MapComponent } from "src/app/general-components";
import { GeoLocationService } from "src/app/services/geo-location/geo-location.service";

@Component({
  selector: "app-location",
  templateUrl: "./location.component.html",
  styleUrls: ["./location.component.css"]
})
export class LocationComponent implements OnInit {
  mapClass = "add-listing-map-height";

  searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("mapParent")
  public mapParent: MapComponent;

  constructor(private geoLocationService: GeoLocationService) {}
  ngOnInit() {
    this.geoLocationService.getSearchCities(this.searchElementRef, ["address"]).subscribe(place => {
      //set latitude, longitude and zoom
      this.mapParent.setFocusLocation(
        place.geometry.location.lat(),
        place.geometry.location.lng(),
        13
      );
    });
  }
}
