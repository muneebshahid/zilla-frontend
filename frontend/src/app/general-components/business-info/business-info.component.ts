import { Component, OnInit, Input, Output, EventEmitter } from "@angular/core";
import { IBusiness } from "src/app/models/business";
import { environment } from "src/environments/environment";
import { IAppState } from "src/app/store/state/app.state";
import { Store } from "@ngrx/store";
import { GetBusinessDetail } from "src/app/store/actions/business";

@Component({
  selector: "app-business-info",
  templateUrl: "./business-info.component.html",
  styleUrls: ["./business-info.component.css"]
})
export class BusinessInfoComponent implements OnInit {
  @Input() public businesses: IBusiness[];
  @Input() public homePage = false;
  @Output() public highlightMarkerEvent = new EventEmitter<any>();

  public endpoint = environment.apiEndpoint;

  constructor(private store: Store<IAppState>) {}

  ngOnInit() {}

  openDetailDrawer(id: number) {
    this.store.dispatch(new GetBusinessDetail({ id: id }));
  }
  highlightMarker(id: number, highlight: boolean) {
    this.highlightMarkerEvent.next({ id: id, highlight: highlight });
  }
}
