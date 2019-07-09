import { ITimings } from "./../../models/timings";
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

@Component({
  selector: "app-business-detail-opening-hours",
  templateUrl: "./business-detail-opening-hours.component.html",
  styleUrls: ["./business-detail-opening-hours.component.css"]
})
export class BusinessDetailOpeningHoursComponent implements OnInit, OnChanges {
  @Input() opening_timings: any[];

  days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
  open_time = [];
  close_time = [];

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    // const name: SimpleChange = changes.name;

    if (this.opening_timings !== null) {
      this.open_time = [];
      this.close_time = [];
      for (let key in this.opening_timings) {
        this.open_time.push(this.opening_timings[key].open);
        this.close_time.push(this.opening_timings[key].close);
      }
    }
  }
}
