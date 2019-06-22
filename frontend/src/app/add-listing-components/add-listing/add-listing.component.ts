import { Component, OnInit, ElementRef, NgZone, ViewChild } from "@angular/core";
import { FormControl } from "@angular/forms";
import { MapsAPILoader } from "@agm/core";
import {} from "googlemaps";
import { MapComponent } from "src/app/general-components";

@Component({
  selector: "app-add-listing",
  templateUrl: "./add-listing.component.html",
  styleUrls: ["./add-listing.component.css"]
})
export class AddListingComponent implements OnInit {
  selectedCityIds: string[];
  mapClass = "add-listing-map-height";

  searchControl: FormControl;

  @ViewChild("search")
  public searchElementRef: ElementRef;

  @ViewChild("mapParent")
  public mapParent: MapComponent;

  cities = [
    { id: 1, name: "08:00" },
    { id: 1, name: "09:00" },
    { id: 1, name: "10:00" },
    { id: 1, name: "11:00" },
    { id: 1, name: "12:00" },
    { id: 1, name: "13:00" },
    { id: 1, name: "14:00" },
    { id: 1, name: "15:00" },
    { id: 1, name: "16:00" },
    { id: 1, name: "17:00" },
    { id: 1, name: "18:00" },
    { id: 1, name: "19:00" },
    { id: 1, name: "20:00" },
    { id: 1, name: "21:00" },
    { id: 1, name: "22:00" },
    { id: 1, name: "23:00" },
    { id: 1, name: "24:00" },
    { id: 1, name: "01:00" },
    { id: 1, name: "02:00" },
    { id: 1, name: "03:00" },
    { id: 1, name: "04:00" },
    { id: 1, name: "05:00" },
    { id: 1, name: "06:00" },
    { id: 1, name: "07:00" }
  ];

  cities2 = [
    { id: 1, name: "Vilnius" },
    { id: 2, name: "Kaunas" },
    { id: 3, name: "Pavilnys", disabled: true },
    { id: 4, name: "Pabradė" },
    { id: 5, name: "Klaipėda" }
  ];

  constructor(private mapsAPILoader: MapsAPILoader, private ngZone: NgZone) {}
  ngOnInit() {
    this.mapsAPILoader.load().then(() => {
      let autocomplete = new google.maps.places.Autocomplete(this.searchElementRef.nativeElement, {
        types: ["address"]
      });
      autocomplete.addListener("place_changed", () => {
        this.ngZone.run(() => {
          //get the place result
          let place: google.maps.places.PlaceResult = autocomplete.getPlace();

          //verify result
          if (place.geometry === undefined || place.geometry === null) {
            return;
          }

          //set latitude, longitude and zoom
          this.mapParent.setPageLocation(
            place.geometry.location.lat(),
            place.geometry.location.lng(),
            13
          );
        });
      });
    });
  }
}
