import { Component, OnInit, Output, EventEmitter, Input } from "@angular/core";

@Component({
  selector: "app-m-filter-map-menu",
  templateUrl: "./m-filter-map-menu.component.html",
  styleUrls: ["./m-filter-map-menu.component.css"]
})
export class MFilterMapMenuComponent implements OnInit {
  @Output() setMobileMapView = new EventEmitter<string>();
  @Input() searchBarEnabled = true;
  constructor() {}

  ngOnInit() {}

  updateMobileMapView() {
    this.setMobileMapView.next("setMobileMapView");
  }
}
