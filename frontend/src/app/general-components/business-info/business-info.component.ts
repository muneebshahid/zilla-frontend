import { Component, OnInit, Input } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit {
  @Input() public businesses: IBusiness[];
  @Input() public homePage = false;

  public endpoint = environment.apiEndpoint;

  constructor() {}

  ngOnInit() {}
}
