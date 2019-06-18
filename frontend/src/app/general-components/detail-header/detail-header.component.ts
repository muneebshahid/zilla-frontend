import { IBusiness } from "../../models/business";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-detail-header",
  templateUrl: "./detail-header.component.html",
  styleUrls: ["./detail-header.component.css"]
})
export class DetailHeaderComponent implements OnInit {
  @Input() type: any;
  @Input() description: string;
  @Input() title: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() expensive: number;
  @Input() tags: Array<string>;
  @Input() open_or_available: string = "Closed";
  @Input() is_open_or_available: boolean = true;
  constructor() {}

  ngOnInit() {}
}
