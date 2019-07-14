import { Component, OnInit, OnDestroy } from "@angular/core";
import { GetBusinessDetail } from "src/app/store/actions/business";
import { Store, select } from "@ngrx/store";
import { IAppState } from "src/app/store/state/app.state";
import { Subscription } from "rxjs";
import { selectBusiness } from "src/app/store/selectors/business";
import { IBusiness } from "src/app/models/business";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-business-detail",
  templateUrl: "./business-detail.component.html",
  styleUrls: ["./business-detail.component.css"]
})
export class BusinessDetailComponent implements OnInit, OnDestroy {
  constructor() {}

  ngOnInit() {}
  ngOnDestroy() {}
}
