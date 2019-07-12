import { IBusiness } from "./../../models/business";
import { Component, OnInit, Input, ViewChild } from "@angular/core";
import { MenuComponent } from "src/app/general-components";

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
