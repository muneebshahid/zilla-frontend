import { Component, OnInit } from "@angular/core";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { Store } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.css"]
})
export class HomeComponent implements OnInit {
  mapClass = "agm-map-home";

  loading = false;

  constructor() {}

  ngOnInit() {}
}
