import { ITimings } from "./../../models/timings";
import { Component, OnInit, Input, OnChanges, SimpleChanges, SimpleChange } from "@angular/core";

@Component({
  selector: "app-business-detail-opening-hours",
  templateUrl: "./business-detail-opening-hours.component.html",
  styleUrls: ["./business-detail-opening-hours.component.css"]
})
export class BusinessDetailOpeningHoursComponent implements OnInit, OnChanges {
  @Input() opening_timings: any[];

  days = [];
  time_start = [];
  time_end = [];

  constructor() {}

  ngOnInit() {}
  ngOnChanges(changes: SimpleChanges) {
    // const name: SimpleChange = changes.name;

    if (this.opening_timings !== null) {
      for (let key in this.opening_timings) {
        let result = this.opening_timings[key].split("-");

        this.days.push(result[0]);
        this.time_start.push(result[1]);
        this.time_end.push(result[2]);
      }
    }
  }
}
