import { IAmenities } from "./../../models/amenities";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-business-detail-amenities",
  templateUrl: "./business-detail-amenities.component.html",
  styleUrls: ["./business-detail-amenities.component.css"]
})
export class BusinessDetailAmenitiesComponent implements OnInit {
  @Input() amenities: IAmenities;
  constructor() {}

  ngOnInit() {}
}
