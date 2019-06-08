import { Component, OnInit } from "@angular/core";

@Component({
  selector: "app-explore",
  templateUrl: "./explore.component.html",
  styleUrls: ["./explore.component.css"]
})
export class ExploreComponent implements OnInit {
  /* To disable to search bar appears in the mapView menu for mobile screens */
  searchBarEnabled = false;

  constructor() {}

  ngOnInit() {}
}
