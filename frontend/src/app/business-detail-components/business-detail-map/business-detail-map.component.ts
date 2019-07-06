import { Component, OnInit, Input, ViewChild, OnChanges, SimpleChanges } from "@angular/core";
import { MapComponent } from "src/app/general-components";

@Component({
  selector: "app-business-detail-map",
  templateUrl: "./business-detail-map.component.html",
  styleUrls: ["./business-detail-map.component.css"]
})
export class BusinessDetailMapComponent implements OnInit, OnChanges {
  mapClass = "agm-map-detail";
  @ViewChild("mapComponent") mapComponent: MapComponent;
  @Input() latlon = [10, 10];
  @Input() address: string;
  @Input() phone: string;
  @Input() website: string;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    // const name: SimpleChange = changes.name;
    if (this.latlon !== null) {
      this.mapComponent.setPageLocation(this.latlon[0], this.latlon[1], 8);
    }
  }

  ngOnInit() {}
}
