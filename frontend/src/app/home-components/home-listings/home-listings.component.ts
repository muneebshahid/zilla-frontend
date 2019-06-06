import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IProduct } from "src/app/models/product";

@Component({
  selector: "app-home-listings",
  templateUrl: "./home-listings.component.html",
  styleUrls: ["./home-listings.component.css"]
})
export class HomeListingsComponent implements OnInit {
  @Input() products: IProduct[];
  @Output() setMobileMapView = new EventEmitter<string>();

  constructor() {}

  baseUrl = "/api";

  ngOnInit() {}

  updateMobileMapView() {
    this.setMobileMapView.next("setMobileMapView");
  }
}
