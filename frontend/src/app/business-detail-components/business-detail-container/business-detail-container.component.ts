import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-business-detail-container",
  templateUrl: "./business-detail-container.component.html",
  styleUrls: ["./business-detail-container.component.css"]
})
export class BusinessDetailContainerComponent implements OnInit {
  @Input() business: IBusiness;

  constructor() {}

  ngOnInit() {}
}
