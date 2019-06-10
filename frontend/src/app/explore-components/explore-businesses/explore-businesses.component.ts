import { IBusiness } from "src/app/models/business";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-explore-businesses",
  templateUrl: "./explore-businesses.component.html",
  styleUrls: ["./explore-businesses.component.css"]
})
export class ExploreBusinessesComponent implements OnInit {
  @Input() businesses: IBusiness[];

  constructor() {}

  ngOnInit() {}
}
