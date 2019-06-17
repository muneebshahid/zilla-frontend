import { IBusiness } from "../../models/business";
import { Component, OnInit, Input } from "@angular/core";

@Component({
  selector: "app-detail-header",
  templateUrl: "./detail-header.component.html",
  styleUrls: ["./detail-header.component.css"]
})
export class DetailHeaderComponent implements OnInit {
  @Input() tag: string;
  @Input() description: string;
  @Input() title: string;
  @Input() address: string;
  @Input() phone: string;
  @Input() expensive: number;
  @Input() tags: Array<string>;
  constructor() {}

  ngOnInit() {}
}
